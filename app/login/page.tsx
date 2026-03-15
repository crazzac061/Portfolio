'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // In a real app, you'd use a session/cookie
        // For simplicity, we'll use localStorage to "remember" login for this session
        localStorage.setItem('isAdmin', 'true');
        router.push('/admin');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl transition-all duration-300 hover:border-zinc-700">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Admin Login
          </h1>
          <p className="text-zinc-500 mt-2">Enter your password to manage blogs</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all placeholder:text-zinc-600"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all transform active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
