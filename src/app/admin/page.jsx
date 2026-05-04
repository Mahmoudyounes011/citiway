'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    featured: 0,
    offPlan: 0,
    sale: 0,
    rent: 0,
    developers: 0,
    leads: 0,
    newLeads: 0,
  });
  const [recentProperties, setRecentProperties] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Properties stats
      const { data: properties } = await supabase.from('properties').select('*');
      const { data: developers } = await supabase.from('developers').select('id');
      const { data: leads } = await supabase.from('leads').select('*');

      setStats({
        totalProperties: properties?.length || 0,
        featured: properties?.filter(p => p.featured).length || 0,
        offPlan: properties?.filter(p => p.category === 'off-plan').length || 0,
        sale: properties?.filter(p => p.category === 'sale').length || 0,
        rent: properties?.filter(p => p.category === 'rent').length || 0,
        developers: developers?.length || 0,
        leads: leads?.length || 0,
        newLeads: leads?.filter(l => l.status === 'new').length || 0,
      });

      setRecentProperties(properties?.slice(0, 5) || []);
      setRecentLeads(leads?.slice(0, 5) || []);
    } catch (e) {
      console.error('Failed to load stats:', e);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, label, value, color, link }) => (
    <Link href={link || '#'} className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">{label}</div>
          <div className="text-3xl font-display font-light" style={{ color: '#0f2444' }}>
            {loading ? '...' : value}
          </div>
        </div>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: color + '15' }}>
          {icon}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl mb-2" style={{ color: '#0f2444', fontWeight: 400 }}>
          Dashboard
        </h1>
        <p className="text-slate-500">Welcome back! Here\'s what\'s happening with Citiway today.</p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <Link href="/admin/properties/new" className="block p-6 text-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
          <div className="text-3xl mb-3">➕</div>
          <div className="font-semibold mb-1">Add New Property</div>
          <div className="text-xs opacity-80">Quick add a listing</div>
        </Link>
        <Link href="/admin/properties" className="block p-6 bg-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 border border-slate-100">
          <div className="text-3xl mb-3">🏢</div>
          <div className="font-semibold mb-1" style={{ color: '#0f2444' }}>Manage Properties</div>
          <div className="text-xs text-slate-500">View, edit, delete</div>
        </Link>
        <Link href="/admin/leads" className="block p-6 bg-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 border border-slate-100 relative">
          {stats.newLeads > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              {stats.newLeads} NEW
            </span>
          )}
          <div className="text-3xl mb-3">✉️</div>
          <div className="font-semibold mb-1" style={{ color: '#0f2444' }}>View Leads</div>
          <div className="text-xs text-slate-500">{stats.leads} total inquiries</div>
        </Link>
        <Link href="/" target="_blank" className="block p-6 bg-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 border border-slate-100">
          <div className="text-3xl mb-3">🌐</div>
          <div className="font-semibold mb-1" style={{ color: '#0f2444' }}>View Live Site</div>
          <div className="text-xs text-slate-500">Opens in new tab</div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <StatCard icon="🏢" label="Total Properties" value={stats.totalProperties} color="#1e88e5" link="/admin/properties" />
        <StatCard icon="⭐" label="Featured" value={stats.featured} color="#f59e0b" link="/admin/properties?filter=featured" />
        <StatCard icon="🏗️" label="Off-Plan" value={stats.offPlan} color="#10b981" link="/admin/properties?filter=off-plan" />
        <StatCard icon="🏠" label="For Sale" value={stats.sale} color="#8b5cf6" link="/admin/properties?filter=sale" />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-display text-xl" style={{ color: '#0f2444', fontWeight: 500 }}>
              Recent Properties
            </h2>
            <Link href="/admin/properties" className="text-sm font-semibold" style={{ color: '#1e88e5' }}>
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentProperties.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No properties yet. <Link href="/admin/properties/new" className="text-blue-600 font-semibold">Add your first one!</Link>
              </div>
            ) : (
              recentProperties.map((p) => (
                <Link key={p.id} href={`/admin/properties/${p.slug}`} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition">
                  <img
                    src={p.cover_image || 'https://via.placeholder.com/100'}
                    alt={p.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate" style={{ color: '#0f2444' }}>{p.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{p.location} • {p.price}</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded font-semibold uppercase ${
                    p.category === 'off-plan' ? 'bg-green-100 text-green-700' :
                    p.category === 'sale' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {p.category}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-display text-xl" style={{ color: '#0f2444', fontWeight: 500 }}>
              Recent Inquiries
            </h2>
            <Link href="/admin/leads" className="text-sm font-semibold" style={{ color: '#1e88e5' }}>
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No inquiries yet. They\'ll appear here when received.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="p-4 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold" style={{ color: '#0f2444' }}>{lead.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{lead.email} • {lead.phone}</div>
                      {lead.message && <div className="text-sm text-slate-600 mt-2 line-clamp-2">{lead.message}</div>}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded font-semibold uppercase ${
                      lead.status === 'new' ? 'bg-red-100 text-red-700' :
                      lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {lead.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
