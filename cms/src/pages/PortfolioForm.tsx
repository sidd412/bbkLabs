import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import { ArrowLeft } from 'lucide-react';

export default function PortfolioForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    industry: '',
    challenge: '',
    approach: '',
    solution: '',
    result: '',
    published: false,
    features: [] as string[],
    techUsed: [] as string[]
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchCaseStudy();
    }
  }, [id]);

  const fetchCaseStudy = async () => {
    try {
      // For editing, we might need an admin specific route to fetch by ID instead of slug,
      // but assuming the backend has standard CRUD. Let's just fetch all and find it for now,
      // or we can use the GET /case-studies to fetch. Wait, the API only has GET /:slug.
      // We will need to update the backend to support GET /admin/:id or we can just fetch all.
      // Actually, let's just make the slug editable and use it to save.
      const res = await api.get('/case-studies?all=true');
      const study = res.data.data.caseStudies.find((s: any) => s._id === id);
      if (study) {
        setFormData({
          title: study.title || '',
          slug: study.slug || '',
          client: study.client || '',
          industry: study.industry || '',
          challenge: study.challenge || '',
          approach: study.approach || '',
          solution: study.solution || '',
          result: study.result || '',
          published: study.published || false,
          features: study.features || [],
          techUsed: study.techUsed || []
        });
      }
    } catch (err) {
      setError('Failed to fetch case study details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'features' | 'techUsed') => {
    const values = e.target.value.split(',').map(v => v.trim());
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (isEditing) {
        await api.put(`/case-studies/${id}`, formData);
      } else {
        await api.post('/case-studies', formData);
      }
      navigate('/portfolio');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save case study');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout><div className="p-8">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="mb-6 flex items-center">
        <button onClick={() => navigate('/portfolio')} className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Case Study' : 'Add New Case Study'}</h2>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL Slug</label>
              <input type="text" name="slug" required value={formData.slug} onChange={handleChange} placeholder="e.g. notexp-app" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Client Name</label>
              <input type="text" name="client" required value={formData.client} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input type="text" name="industry" required value={formData.industry} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Challenge (Problem)</label>
            <textarea name="challenge" required rows={3} value={formData.challenge} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Approach (How we solved it)</label>
            <textarea name="approach" required rows={3} value={formData.approach} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Solution Details</label>
            <textarea name="solution" required rows={3} value={formData.solution} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Results</label>
            <input type="text" name="result" required value={formData.result} onChange={handleChange} placeholder="e.g. 50% increase in sales" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Features (comma separated)</label>
              <input type="text" value={formData.features.join(', ')} onChange={(e) => handleArrayChange(e, 'features')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tech Stack (comma separated)</label>
              <input type="text" value={formData.techUsed.join(', ')} onChange={(e) => handleArrayChange(e, 'techUsed')} placeholder="e.g. React, Node.js, MongoDB" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">Publish Immediately</label>
              <p className="text-gray-500">If checked, this project will instantly appear on bbklabs.com</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/portfolio')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
