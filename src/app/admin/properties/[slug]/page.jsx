'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import PropertyForm from '../../../../components/admin/PropertyForm';

export default function EditPropertyPage() {
  const params = useParams();
  const slug = params.slug;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    loadProperty();
  }, [slug]);

  const loadProperty = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      setError(error.message);
    } else {
      setProperty(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <div className="mt-4 text-slate-500">Loading property...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="p-12 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-bold mb-2">Property Not Found</h2>
        <p className="text-slate-500">{error || 'This property does not exist.'}</p>
      </div>
    );
  }

  return <PropertyForm existingProperty={property} />;
}
