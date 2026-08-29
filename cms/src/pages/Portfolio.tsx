import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Layout from '../components/Layout';

function DeleteConfirmModal({ title, onClose, onConfirm }: { title: string, onClose: () => void, onConfirm: () => void }) {
  const [input, setInput] = useState('');
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h2>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
        </p>
        <p className="text-sm text-gray-600 mb-2">Type <strong>DELETE</strong> to confirm.</p>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="DELETE"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 mb-6"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
          <button 
            disabled={input !== 'DELETE' || deleting} 
            onClick={async () => { setDeleting(true); await onConfirm(); }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingStudy, setDeletingStudy] = useState<any | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await api.get('/case-studies?all=true');
      setCaseStudies(response.data.data.caseStudies || []);
    } catch (error) {
      console.error('Failed to fetch case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuccess = async () => {
    if (!deletingStudy) return;
    try {
      await api.delete(`/case-studies/${deletingStudy._id}`);
      fetchCaseStudies();
      setDeletingStudy(null);
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete case study.');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === caseStudies.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newOrder = [...caseStudies];
    
    // Swap
    const temp = newOrder[index];
    newOrder[index] = newOrder[newIndex];
    newOrder[newIndex] = temp;

    // Assign temporary local state for immediate feedback
    setCaseStudies(newOrder);

    try {
      // Save order to backend for both swapped items
      await Promise.all([
        api.put(`/case-studies/${newOrder[index]._id}`, { order: index }),
        api.put(`/case-studies/${newOrder[newIndex]._id}`, { order: newIndex })
      ]);
      fetchCaseStudies();
    } catch (error) {
      console.error('Failed to reorder:', error);
      alert('Failed to save the new order.');
      fetchCaseStudies(); // revert
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
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Project
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading...</div>
        ) : caseStudies.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <p className="font-medium text-gray-900">No projects found.</p>
            <p className="text-sm mt-2">Publish from Ongoing Projects or click "Add New Project".</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {caseStudies.map((study, index) => (
              <li key={study._id} className="hover:bg-gray-50/50 transition-colors">
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="flex flex-col space-y-1 mr-4">
                    <button 
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 rounded transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button 
                      disabled={index === caseStudies.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 rounded transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 truncate">{study.title}</h3>
                      <div className="mt-1 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          Client: {study.client} • Industry: {study.industry}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5 flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full ${study.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {study.published ? 'Published' : 'Draft'}
                      </span>
                      <button onClick={() => window.location.href = `/portfolio/edit/${study._id}`} className="text-gray-400 hover:text-blue-500 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeletingStudy(study)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {deletingStudy && (
        <DeleteConfirmModal
          title={deletingStudy.title}
          onClose={() => setDeletingStudy(null)}
          onConfirm={handleDeleteSuccess}
        />
      )}
    </Layout>
  );
}
