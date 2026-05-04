'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/admin');
    });
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2444 0%, #0a1628 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #4a90e2 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #1e88e5 0%, transparent 70%)' }} />
      </div>

      {/* Login Card */}
      <div className="relative bg-white shadow-2xl w-full max-w-md p-10 md:p-12" style={{ borderRadius: '8px' }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Citiway" className="h-16 w-auto mx-auto mb-4" />
          <div className="text-xs tracking-[0.4em] uppercase font-semibold mt-4" style={{ color: '#1e88e5' }}>
            Admin Portal
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl mb-2" style={{ color: '#0f2444', fontWeight: 400 }}>
            Welcome Back
          </h1>
          <p className="text-sm font-light" style={{ color: '#5a6b7c' }}>
            Sign in to access your dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: '#5a6b7c' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition"
              style={{ borderColor: '#e8edf2', borderRadius: '4px' }}
              placeholder="admin@citiway.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: '#5a6b7c' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition"
              style={{ borderColor: '#e8edf2', borderRadius: '4px' }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold tracking-wider text-sm uppercase transition disabled:opacity-50"
            style={{
              background: loading ? '#aab8c5' : 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
              borderRadius: '4px'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: '#e8edf2' }}>
          <p className="text-xs" style={{ color: '#aab8c5' }}>
            © {new Date().getFullYear()} Citiway Real Estate. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
