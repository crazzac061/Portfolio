'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/src/components/ArticleCard';

export default function BlogPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('/api/blog');
                if (res.ok) {
                    const data = await res.json();
                    setArticles(data.articles || []);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
                <p className="text-gray-400 text-xl mb-12">
                    Thoughts on design, development, and everything in between.
                </p>
                
                <div className="grid gap-8">
                    {loading ? (
                        <div className="animate-pulse space-y-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-40 bg-zinc-900 rounded-xl"></div>
                            ))}
                        </div>
                    ) : articles.length > 0 ? (
                        articles.map((article) => (
                            <article key={article.id} className="border-b border-gray-700 pb-8 hover:translate-x-2 transition-transform">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-2">
                                            {article.tags?.map((tag, idx) => (
                                                <span key={idx} className="text-xs text-blue-400 uppercase tracking-wider">{tag}</span>
                                            ))}
                                        </div>
                                        <h2 className="text-2xl font-bold">{article.title || 'Untitled'}</h2>
                                    </div>
                                    <time className="text-gray-500 text-sm whitespace-nowrap">{article.publishedDate}</time>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    {article.description}
                                </p>
                                <a href={`/blog/${article.id}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                                    Read Article →
                                </a>
                            </article>
                        ))
                    ) : (
                        <p className="text-zinc-500 italic">No blog posts found.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
