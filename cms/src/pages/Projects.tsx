import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import { Plus, Pencil, Trash2, IndianRupee, Clock, Building } from 'lucide-react';

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
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete:', error);
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
                          onClick={() => navigate(`/projects/edit/${project._id}`)} 
                          className="text-gray-400 hover:text-blue-500 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project._id)} 
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
    </Layout>
  );
}
