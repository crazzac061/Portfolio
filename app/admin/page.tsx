'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@/src/components/Editor';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [siteName, setSiteName] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus !== 'true') {
      router.push('/login');
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const blogPost = {
      title,
      description,
      url: url || `/blog/${encodeURIComponent(title.toLowerCase().replace(/ /g, '-'))}`, // Fallback to internal link
      imgUrl,
      siteName: siteName || 'Portfolio',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      content,
    };

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      });

      if (res.ok) {
        setMessage('Blog post added successfully!');
        // Reset form
        setTitle('');
        setDescription('');
        setUrl('');
        setImgUrl('');
        setSiteName('');
        setTags('');
        setContent('');
      } else {
        setMessage('Failed to add blog post.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/login');
  };

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-lg transition-colors border border-zinc-800 hover:text-white"
          >
            Logout
          </button>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-8 text-white">Write a Story</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1 font-bold">Title</label>
              <input
                type="text"
                placeholder="The Title of Your Masterpiece"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-0 py-2 bg-transparent border-b border-zinc-800 focus:border-white focus:outline-none transition-all text-3xl font-bold placeholder:text-zinc-800"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1 font-bold">Category / Publisher</label>
                <input
                  type="text"
                  placeholder="e.g. Design, Tech"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1 font-bold">Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Next.js, UI, Design"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1 font-bold">Short Description</label>
              <textarea
                placeholder="A brief summary for the list view..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all min-h-[80px]"
                required
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1 font-bold">Content</label>
              <Editor content={content} onChange={setContent} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1 font-bold">External URL (Leave blank for internal)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1 font-bold">Cover Image URL</label>
                <input
                  type="text"
                  placeholder="https://...jpg"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-xl border ${message.includes('successfully') ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-xl shadow-zinc-500/10"
            >
              {loading ? 'Publishing...' : 'Publish Blog Post'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
