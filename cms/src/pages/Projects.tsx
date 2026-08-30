import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import { Plus, Pencil, Trash2, IndianRupee, Clock, Building, Megaphone, X, FileText } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  client: string;
  status: 'started' | 'ongoing' | 'completed' | 'on-hold';
  totalRevenue: number;
  advancePaid: number;
  startDate: string;
  deadline?: string;
  maintenanceRenewalDate?: string;
  services?: string[];
}

function PublishCaseStudyModal({ 
  project, 
  onClose, 
  onSuccess 
}: { 
  project: Project, 
  onClose: () => void, 
  onSuccess: () => void 
}) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title,
    client: project.client,
    industry: project.services?.[0]?.replace(/-/g, ' ') || 'Technology',
    challenge: '',
    approach: '',
    solution: '',
    results: '',
    coverImage: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      await api.post('/case-studies', {
        title: formData.title,
        client: formData.client,
        industry: formData.industry,
        challenge: formData.challenge,
        approach: formData.approach,
        solution: formData.solution,
        result: formData.results, // Backend expects 'result'
        featuredImage: formData.coverImage,
        slug,
        published: true
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to publish case study:', error);
      alert('Failed to publish case study.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Publish as Case Study</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Create a public case study for <strong>{project.title}</strong> to showcase your work on the website.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Public Title *</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
              <input
                required
                type="text"
                value={formData.client}
                onChange={e => setFormData({...formData, client: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
              <input
                required
                type="text"
                value={formData.industry}
                onChange={e => setFormData({...formData, industry: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={e => setFormData({...formData, coverImage: e.target.value})}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">The Challenge *</label>
            <textarea
              required
              rows={2}
              value={formData.challenge}
              onChange={e => setFormData({...formData, challenge: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Our Approach *</label>
            <textarea
              required
              rows={2}
              value={formData.approach}
              onChange={e => setFormData({...formData, approach: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Our Solution *</label>
            <textarea
              required
              rows={2}
              value={formData.solution}
              onChange={e => setFormData({...formData, solution: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">The Results *</label>
            <textarea
              required
              rows={2}
              value={formData.results}
              onChange={e => setFormData({...formData, results: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              Cancel
            </button>
            <button disabled={saving} type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
              {saving ? 'Publishing...' : 'Publish to Website'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishingProject, setPublishingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuccess = async () => {
    if (!deletingProject) return;
    try {
      await api.delete(`/projects/${deletingProject._id}`);
      fetchProjects();
      setDeletingProject(null);
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete project.');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'started': 'bg-blue-100 text-blue-800',
      'ongoing': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'on-hold': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles['started']}`}>{status.toUpperCase()}</span>;
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ongoing Projects</h2>
          <p className="mt-1 text-sm text-gray-500">
            Track active client work, deadlines, and pending payments.
          </p>
        </div>
        <button
          onClick={() => navigate('/projects/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Project
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Building className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="font-medium text-gray-900">No active projects found.</p>
            <p className="text-sm mt-1">Click "Add Project" to start tracking your work.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Project Info</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Financials</th>
                  <th className="px-6 py-4">Timeline</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{project.title}</div>
                      <div className="text-xs text-gray-500 mt-1">Client: {project.client}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-900 font-medium">
                        <IndianRupee className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        {project.totalRevenue.toLocaleString()} Total
                      </div>
                      <div className="flex items-center text-xs text-green-600 mt-1 font-medium">
                        <IndianRupee className="w-3 h-3 mr-1" />
                        {project.advancePaid.toLocaleString()} Received
                      </div>
                      <div className="flex items-center text-xs text-red-500 mt-1 font-medium">
                        <IndianRupee className="w-3 h-3 mr-1" />
                        {(project.totalRevenue - project.advancePaid).toLocaleString()} Pending
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                        Started: {new Date(project.startDate).toLocaleDateString()}
                      </div>
                      {project.deadline && (
                        <div className="flex items-center text-xs text-orange-500 mt-1">
                          Deadline: {new Date(project.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => setPublishingProject(project)}
                          title="Publish as Case Study"
                          className="text-gray-400 hover:text-green-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Megaphone className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => window.open(`/projects/invoice/${project._id}`, '_blank')}
                          title="View Invoice / Receipt"
                          className="text-gray-400 hover:text-purple-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => navigate(`/projects/edit/${project._id}`)} 
                          title="Edit Project"
                          className="text-gray-400 hover:text-blue-500 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => setDeletingProject(project)} 
                          className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {publishingProject && (
        <PublishCaseStudyModal
          project={publishingProject}
          onClose={() => setPublishingProject(null)}
          onSuccess={() => {
            setPublishingProject(null);
            alert('Case study successfully published to the website!');
            navigate('/portfolio');
          }}
        />
      )}

      {deletingProject && (
        <DeleteConfirmModal
          title={deletingProject.title}
          onClose={() => setDeletingProject(null)}
          onConfirm={handleDeleteSuccess}
        />
      )}
    </Layout>
  );
}
