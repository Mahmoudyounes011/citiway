'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const handlePasswordChange = async () => {
    setError(''); setMessage('');

    if (newPassword.length < 6) return setError('Password must be at least 6 characters');
    if (newPassword !== confirmPassword) return setError('Passwords do not match');

    setUpdating(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setUpdating(false);

    if (error) setError(error.message);
    else {
      setMessage('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl mb-2" style={{ color: '#0f2444', fontWeight: 400 }}>
          Settings
        </h1>
        <p className="text-slate-500">Manage your account and preferences</p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="font-display text-xl mb-4" style={{ color: '#0f2444' }}>Account</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Email</label>
            <div className="text-sm font-medium">{user?.email || 'Loading...'}</div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Role</label>
            <div className="text-sm font-medium">Administrator</div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Account Created</label>
            <div className="text-sm font-medium">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="font-display text-xl mb-4" style={{ color: '#0f2444' }}>Change Password</h2>

        {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            disabled={updating}
            className="px-6 py-2.5 text-white font-semibold text-sm rounded-lg disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}
          >
            {updating ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* Help */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2" style={{ color: '#0f2444' }}>💡 Need Help?</h3>
        <p className="text-sm text-slate-600">
          Check the <code className="bg-white px-2 py-0.5 rounded">ADMIN_GUIDE.md</code> file in your project for detailed instructions on how to use the admin panel.
        </p>
      </div>
    </div>
  );
}
