'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export default function BlogPostDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/blog?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        } else {
          console.error('Failed to fetch article');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-64 bg-zinc-900 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-zinc-900 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-32">
        <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
        <Link href="/blog" className="text-blue-400 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 mb-12 group w-fit">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags?.map((tag: string, idx: number) => (
              <span key={idx} className="px-3 py-1 bg-zinc-900 text-blue-400 text-xs uppercase tracking-widest rounded-full border border-zinc-800">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-zinc-500 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {article.publishedDate}
            </div>
            {article.siteName && (
              <div className="flex items-center gap-2">
                <Tag size={16} />
                {article.siteName}
              </div>
            )}
          </div>
        </header>

        {article.imgUrl && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-zinc-900 shadow-2xl">
            <img 
              src={article.imgUrl} 
              alt={article.title} 
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        <article className="prose prose-invert prose-zinc max-w-none">
          {/* This is where the Tiptap HTML content is rendered */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        <footer className="mt-20 pt-12 border-t border-zinc-900">
          <div className="flex justify-between items-center">
            <div className="text-zinc-500">
              Thanks for reading!
            </div>
            <Link href="/blog" className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors border border-zinc-800">
              View all posts
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
