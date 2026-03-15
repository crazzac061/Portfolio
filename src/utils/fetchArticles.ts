import { Article } from '../components/ArticleCard';
import * as cheerio from 'cheerio';

export async function fetchArticles(): Promise<Article[]> {
  console.log('Fetching articles...');
  
  try {
    // Fetch from our local API which now uses MongoDB
    // Note: In Next.js, we can use a relative URL if this is called frontend-side, 
    // but if it's called during SSR/build, we might need an absolute URL or a direct DB call.
    // However, since we want to keep the scraping logic, we'll keep it as is but get the list of URLs from the DB.
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog`);
    const data = await response.json();
    const articlesFromDb = data.articles || [];

    const results = await Promise.all(
      articlesFromDb.map(async (item: any) => {
        // If the item already has full content/metadata from the DB, we can skip scraping
        // but the current implementation seems to scrap every time. 
        // Let's preserve the scraping fallback but prioritize DB data.

        if (!item.url || typeof item.url !== 'string' || item.url.trim() === '') {
          console.warn(`Invalid URL: ${item.url}`);
          return null;
        }

        // If it's an internal blog post (starts with /blog), it doesn't need external scraping
        if (item.url.startsWith('/blog/')) {
          return item as Article;
        }

        console.log('Scraping URL: ' + item.url);
        let scrapedData;
        try {
          const fetchResponse = await fetch(item.url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 ...',
              'Accept': 'text/html,...',
            },
          });

          if (!fetchResponse.ok) throw new Error(`HTTP error ${fetchResponse.status}`);
          
          const html = await fetchResponse.text();
          const $ = cheerio.load(html);
          const jsonScript = $('script[type="application/ld+json"]').html();
          scrapedData = { metadata: jsonScript ? JSON.parse(jsonScript) : {}, html };
        } catch (error) {
          console.error(`Scraping failed for ${item.url}:`, error);
          return item as Article; // Return what we have in DB if scraping fails
        }

        return {
          ...item,
          id: item.id ?? 0,
          tags: item.tags ?? [],
          title: item.title || 'No title',
          description: item.description || 'No description',
          publishedDate: item.publishedDate || 'No date',
          imgUrl: item.imgUrl || '/img-2.jpg',
          siteName: item.siteName || 'Unknown site',
          url: item.url || '',
        } as Article;
      })
    );

    const filteredResults = results.filter((article): article is Article => article !== null);
    return filteredResults.sort((a, b) => {
      const dateA = new Date(a.publishedDate || '').getTime();
      const dateB = new Date(b.publishedDate || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Failed to fetch articles from API:', error);
    return [];
  }
}
