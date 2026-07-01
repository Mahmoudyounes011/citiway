'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase, signOut } from '../../lib/supabase';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/properties', label: 'Properties', icon: '🏢' },
  { href: '/admin/developers', label: 'Developers', icon: '🏗️' },
  { href: '/admin/leads', label: 'Leads & Inquiries', icon: '✉️' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Secondary, client-side UX gate. The AUTHORITATIVE check is the
    // server-side middleware; getUser() (not getSession()) validates the
    // token against the auth server so this never trusts raw cookies.
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user && pathname !== '/admin/login') {
        router.replace(`/admin/login?redirectTo=${encodeURIComponent(pathname)}`);
        return;
      }
      setUser(user || null);
      setLoading(false);
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/admin/login');
      }
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  // Login page has no sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <img src="/logo-white.png" alt="Citiway" className="h-10 w-auto" />
          </Link>
          <div className="mt-3 text-xs text-slate-400 tracking-wider">ADMIN PANEL</div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User & Sign Out */}
        <div className="p-4 border-t border-slate-800">
          <div className="px-4 py-3 mb-2 text-xs text-slate-400">
            <div className="text-white font-medium truncate">{user?.email}</div>
            <div className="text-slate-500 mt-1">Administrator</div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-300 hover:bg-red-600 hover:text-white transition-all"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-all mt-1"
          >
            <span>🌐</span>
            <span>View Live Site</span>
          </Link>
        </div>
      </aside>

      {/* Backdrop on mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
