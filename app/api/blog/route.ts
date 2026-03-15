import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const filePath = path.join(process.cwd(), 'app/articles.json');
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    if (id) {
      const article = data.articles.find((a: any) => a.id === parseInt(id));
      if (article) {
        return NextResponse.json(article);
      }
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ articles: [] });
  }
}

export async function POST(request: Request) {
  const newArticle = await request.json();
  const filePath = path.join(process.cwd(), 'app/articles.json');

  try {
    let data: { articles: any[] } = { articles: [] };
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileContents);
    }

    // Generate a new ID
    const nextId = data.articles.length > 0 
      ? Math.max(...data.articles.map((a: { id: number }) => a.id)) + 1 
      : 1;

    const articleWithId = {
      ...newArticle,
      id: nextId,
      publishedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      content: newArticle.content || '' // Ensure content is stored
    };

    data.articles.unshift(articleWithId); // Add to the beginning

    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

    return NextResponse.json({ success: true, article: articleWithId });
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json({ success: false, error: 'Failed to save article' }, { status: 500 });
  }
}
