import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';

export default function Portfolio() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      // Pass ?all=true to fetch published and unpublished
      const response = await api.get('/case-studies?all=true');
      setCaseStudies(response.data.data.caseStudies || []);
    } catch (error) {
      console.error('Failed to fetch case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      await api.delete(`/case-studies/${id}`);
      fetchCaseStudies();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <Layout>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Manager</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your past work and case studies to show on the main website.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => window.location.href = '/portfolio/new'}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Project
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading...</div>
        ) : caseStudies.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <p>No projects found.</p>
            <p className="text-sm mt-2">Click "Add New Project" to upload noteXP, Talksy, etc.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {caseStudies.map((study) => (
              <li key={study._id}>
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-blue-600 truncate">{study.title}</h3>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          Client: {study.client} • Industry: {study.industry}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5 flex items-center space-x-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${study.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {study.published ? 'Published' : 'Draft'}
                      </span>
                      <button onClick={() => window.location.href = `/portfolio/edit/${study._id}`} className="text-gray-400 hover:text-blue-500">
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(study._id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
