'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

const STATUSES = [
  { value: 'new', label: 'New', color: 'red' },
  { value: 'contacted', label: 'Contacted', color: 'yellow' },
  { value: 'qualified', label: 'Qualified', color: 'blue' },
  { value: 'converted', label: 'Converted', color: 'green' },
  { value: 'closed', label: 'Closed', color: 'gray' },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads(data || []);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    loadLeads();
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl mb-2" style={{ color: '#0f2444', fontWeight: 400 }}>
          Leads & Inquiries
        </h1>
        <p className="text-slate-500">Manage all customer inquiries from your website</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            All ({leads.length})
          </button>
          {STATUSES.map(s => {
            const count = leads.filter(l => l.status === s.value).length;
            return (
              <button
                key={s.value}
                onClick={() => setFilter(s.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === s.value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {s.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-3">📭</div>
            <h3 className="font-semibold mb-1">No leads yet</h3>
            <p className="text-sm text-slate-500">Inquiries from the website will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLeads.map(lead => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="p-4 md:p-5 hover:bg-slate-50 cursor-pointer transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold" style={{ color: '#0f2444' }}>{lead.name}</h3>
                      <StatusBadge status={lead.status} />
                    </div>
                    <div className="text-xs text-slate-500 mb-2">
                      📧 {lead.email} {lead.phone && `• 📱 ${lead.phone}`}
                    </div>
                    {lead.message && <div className="text-sm text-slate-600 line-clamp-2">{lead.message}</div>}
                    {lead.property_slug && (
                      <div className="text-xs text-blue-600 mt-2">
                        🏢 Re: {lead.property_slug}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-white max-w-2xl w-full rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-display text-2xl" style={{ color: '#0f2444' }}>Lead Details</h2>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-700 text-2xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">Name</label>
                <div className="text-lg font-semibold" style={{ color: '#0f2444' }}>{selectedLead.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-500">Email</label>
                  <a href={`mailto:${selectedLead.email}`} className="block text-blue-600 hover:underline">{selectedLead.email}</a>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-500">Phone</label>
                  <a href={`tel:${selectedLead.phone}`} className="block text-blue-600 hover:underline">{selectedLead.phone || '—'}</a>
                </div>
              </div>
              {selectedLead.message && (
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-500">Message</label>
                  <div className="bg-slate-50 p-4 rounded-lg text-sm leading-relaxed">{selectedLead.message}</div>
                </div>
              )}
              {selectedLead.property_slug && (
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-500">Interested In</label>
                  <div className="text-sm">{selectedLead.property_slug}</div>
                </div>
              )}
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500 block mb-2">Status</label>
                <div className="flex gap-2 flex-wrap">
                  {STATUSES.map(s => (
                    <button
                      key={s.value}
                      onClick={() => updateStatus(selectedLead.id, s.value)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded ${
                        selectedLead.status === s.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <a href={`mailto:${selectedLead.email}`} className="flex-1 text-center py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700">
                  ✉️ Reply via Email
                </a>
                {selectedLead.phone && (
                  <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" className="flex-1 text-center py-2.5 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700">
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUSES.find(s => s.value === status) || STATUSES[0];
  const colors = {
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    gray: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase ${colors[s.color]}`}>
      {s.label}
    </span>
  );
}
