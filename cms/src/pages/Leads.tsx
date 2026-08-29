import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Mail, Phone, Clock, Search, MoreVertical, Building } from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  businessName?: string;
  phone: string;
  email?: string;
  businessType?: string;
  serviceNeeded: string;
  requirement?: string;
  status: 'new' | 'contacted' | 'in-progress' | 'converted' | 'closed';
  createdAt: string;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads');
      setLeads(response.data.data.leads || []);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/leads/${id}`, { status });
      setLeads(leads.map(l => l._id === id ? { ...l, status: status as any } : l));
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    (l.businessName && l.businessName.toLowerCase().includes(search.toLowerCase())) ||
    l.phone.includes(search)
  );

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      'converted': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800',
    };
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.new}`}>{status.toUpperCase()}</span>;
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-500 mt-1">Manage and track your incoming client inquiries.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leads by name, business, or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-500">
            Total Leads: {filteredLeads.length}
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-gray-400" />
            </div>
            <p className="font-medium text-gray-900">No leads found</p>
            <p className="text-sm mt-1">Wait for clients to submit the contact form.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Client Details</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Requirement</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      {lead.businessName && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          {lead.businessName} {lead.businessType ? `(${lead.businessType})` : ''}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center text-gray-900">
                        <Phone className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        {lead.phone}
                      </div>
                      {lead.email && (
                        <div className="flex items-center text-gray-500">
                          <Mail className="w-3.5 h-3.5 mr-2 text-gray-400" />
                          {lead.email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.serviceNeeded.replace('-', ' ')}</div>
                      {lead.requirement && (
                        <div className="text-xs text-gray-500 truncate max-w-[200px] mt-1" title={lead.requirement}>
                          {lead.requirement}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                        className="text-sm bg-transparent border-none cursor-pointer focus:ring-0"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <div className="mt-1">{getStatusBadge(lead.status)}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
