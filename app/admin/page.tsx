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
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [fetchingArticles, setFetchingArticles] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus !== 'true') {
      router.push('/login');
    } else {
      setIsAdmin(true);
      fetchArticles();
      
      // Load draft from localStorage on mount
      const savedDraft = localStorage.getItem('blogDraft');
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          if (confirm('Restore unsaved draft?')) {
            setTitle(draft.title || '');
            setDescription(draft.description || '');
            setUrl(draft.url || '');
            setImgUrl(draft.imgUrl || '');
            setSiteName(draft.siteName || '');
            setTags(draft.tags || '');
            setContent(draft.content || '');
            setStatus(draft.status || 'published');
          } else {
            localStorage.removeItem('blogDraft');
          }
        } catch (e) {
          console.error('Failed to parse draft:', e);
        }
      }
    }
  }, [router]);

  // Auto-save to localStorage
  useEffect(() => {
    if (title || content || description) {
      const draft = { title, description, url, imgUrl, siteName, tags, content, status };
      localStorage.setItem('blogDraft', JSON.stringify(draft));
    }
  }, [title, description, url, imgUrl, siteName, tags, content, status]);

  const fetchArticles = async () => {
    setFetchingArticles(true);
    try {
      const res = await fetch('/api/blog?admin=true');
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setFetchingArticles(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setUrl('');
    setImgUrl('');
    setSiteName('');
    setTags('');
    setContent('');
    setStatus('published');
    setEditingId(null);
    localStorage.removeItem('blogDraft');
  };

  const handleSubmit = async (e: React.FormEvent, isDraftSubmit: boolean = false) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage('');

    const currentStatus = isDraftSubmit ? 'draft' : status;

    const blogPost = {
      id: editingId,
      title,
      description,
      url: url || `/blog/${encodeURIComponent(title.toLowerCase().replace(/ /g, '-'))}`,
      imgUrl,
      siteName: siteName || 'Portfolio',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      content,
      status: currentStatus,
    };

    try {
      const res = await fetch('/api/blog', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      });

      if (res.ok) {
        setMessage(editingId ? 'Blog post updated successfully!' : 'Blog post added successfully!');
        resetForm();
        fetchArticles();
      } else {
        setMessage('Failed to save blog post.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setTitle(article.title || '');
    setDescription(article.description || '');
    setUrl(article.url || '');
    setImgUrl(article.imgUrl || '');
    setSiteName(article.siteName || '');
    setTags(Array.isArray(article.tags) ? article.tags.join(', ') : (article.tags || ''));
    setContent(article.content || '');
    setStatus(article.status || 'published');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const res = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setArticles(articles.filter(a => a.id !== id));
        setMessage('Blog post deleted successfully!');
      } else {
        setMessage('Failed to delete blog post.');
      }
    } catch (err) {
      setMessage('An error occurred while deleting.');
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

        <div className="space-y-12">
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-white">{editingId ? 'Edit Story' : 'Write a Story'}</h2>
              {editingId && (
                <button 
                  onClick={resetForm}
                  className="text-sm text-zinc-500 hover:text-white transition-colors underline"
                >
                  Cancel Editing
                </button>
              )}
            </div>
            
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
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

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1 font-bold">Status</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStatus('published')}
                    className={`px-6 py-2 rounded-xl border transition-all ${status === 'published' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800'}`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('draft')}
                    className={`px-6 py-2 rounded-xl border transition-all ${status === 'draft' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800'}`}
                  >
                    Draft
                  </button>
                </div>
              </div>

              {message && (
                <div className={`p-4 rounded-xl border ${message.includes('successfully') ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
                  {message}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-xl shadow-zinc-500/10"
                >
                  {loading ? 'Processing...' : editingId ? 'Update Post' : 'Publish Blog Post'}
                </button>
                {!editingId && (
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e as any, true)}
                    disabled={loading}
                    className="flex-1 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all border border-zinc-800"
                  >
                    Save as Draft
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-8 text-white">Manage Blogs</h2>
            
            {fetchingArticles ? (
              <div className="text-center py-12 text-zinc-500">Loading articles...</div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl">
                No blog posts found.
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl hover:border-zinc-700 transition-all group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-white truncate pr-4">{article.title || 'Untitled'}</h3>
                        {article.status === 'draft' && (
                          <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] uppercase tracking-tighter rounded-full border border-zinc-700">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500">{article.publishedDate || 'No date'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-all text-sm font-medium border border-zinc-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all text-sm font-medium border border-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
