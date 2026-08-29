import { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Mail, Phone, Clock, Search, MoreVertical, Building, X, Upload, Trash2, Plus, Filter } from 'lucide-react';

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
  source?: string;
  createdAt: string;
}

const STATUS_ORDER = ['new', 'contacted', 'in-progress', 'converted', 'closed'];

const SERVICE_OPTIONS = [
  { value: 'website', label: 'Website' },
  { value: 'software', label: 'Software' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'ai-automation', label: 'AI / Automation' },
  { value: 'seo-digital-growth', label: 'SEO / Digital Growth' },
  { value: 'business-automation', label: 'Business Automation' },
  { value: 'not-sure', label: 'Not sure' },
  { value: 'other', label: 'Other' },
];

const BUSINESS_TYPE_OPTIONS = [
  "Education / School",
  "Healthcare / Clinic",
  "Real Estate",
  "E-commerce / Retail",
  "Hospitality / Hotel / Restaurant",
  "Finance / Accounting",
  "Manufacturing / Industrial",
  "Technology / IT",
  "Agency / Consulting",
  "Non-Profit / NGO",
  "Other"
];

function CreateLeadModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: '',
    serviceNeeded: 'website',
    requirement: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/leads', formData);
      onSuccess();
    } catch (error) {
      console.error('Failed to create lead:', error);
      alert('Failed to create lead.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Create New Lead</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input type="text" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
              <select value={formData.businessType} onChange={e => setFormData({...formData, businessType: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                {BUSINESS_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed *</label>
              <select required value={formData.serviceNeeded} onChange={e => setFormData({...formData, serviceNeeded: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                {SERVICE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requirement</label>
            <textarea rows={3} value={formData.requirement} onChange={e => setFormData({...formData, requirement: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
            <button disabled={saving} type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
              {saving ? 'Creating...' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConvertLeadModal({ 
  lead, 
  onClose, 
  onSuccess 
}: { 
  lead: Lead, 
  onClose: () => void, 
  onSuccess: (leadId: string) => void 
}) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    totalRevenue: 0,
    advancePaid: 0,
    deadline: '',
    maintenanceRenewalDate: '',
    notes: `Automatically created from lead conversion.\nContact: ${lead.phone} | ${lead.email || ''}\nRequirement: ${lead.requirement || 'N/A'}`
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const clientName = lead.businessName || lead.name;
      const title = `${lead.serviceNeeded.replace(/-/g, ' ')} for ${clientName}`;
      await api.post('/projects', {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        client: clientName,
        industry: lead.businessType || 'Other',
        status: 'started',
        totalRevenue: formData.totalRevenue,
        advancePaid: formData.advancePaid,
        services: [lead.serviceNeeded],
        deadline: formData.deadline || undefined,
        maintenanceRenewalDate: formData.maintenanceRenewalDate || undefined,
        notes: formData.notes
      });

      await api.patch(`/leads/${lead._id}/status`, { status: 'converted' });
      
      onSuccess(lead._id);
    } catch (error) {
      console.error('Failed to convert lead:', error);
      alert('Failed to convert lead and create project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Convert Lead to Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            You are converting <strong>{lead.name}</strong> into an active project. Please provide the financial and timeline details to initialize the project tracker.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Cost (₹) *</label>
              <input required type="number" value={formData.totalRevenue} onChange={e => setFormData({...formData, totalRevenue: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Advance Paid (₹) *</label>
              <input required type="number" value={formData.advancePaid} onChange={e => setFormData({...formData, advancePaid: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Renewal</label>
              <input type="date" value={formData.maintenanceRenewalDate} onChange={e => setFormData({...formData, maintenanceRenewalDate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
            <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
            <button disabled={saving} type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
              {saving ? 'Creating Project...' : 'Convert to Project'}
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

function UploadCSVModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');

    try {
      const text = await file.text();
      const rows = text.split('\n').filter(r => r.trim());
      if (rows.length < 2) throw new Error('File is empty or missing headers');

      const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
      
      const requiredHeaders = ['name', 'phone', 'email', 'service needed'];
      const missing = requiredHeaders.filter(h => !headers.includes(h));
      if (missing.length > 0) throw new Error(`Missing mandatory headers: ${missing.join(', ')}`);

      const nameIdx = headers.indexOf('name');
      const phoneIdx = headers.indexOf('phone');
      const emailIdx = headers.indexOf('email');
      const serviceIdx = headers.indexOf('service needed');
      const reqIdx = headers.indexOf('requirement');

      const leads = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',').map(c => c.trim());
        if (!row[nameIdx] || !row[phoneIdx]) continue;
        
        leads.push({
          name: row[nameIdx],
          phone: row[phoneIdx],
          email: row[emailIdx] || undefined,
          serviceNeeded: row[serviceIdx] || 'other',
          requirement: reqIdx >= 0 ? row[reqIdx] : undefined,
          source: 'csv'
        });
      }

      await api.post('/leads/batch', { leads });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to parse and upload CSV');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upload Leads CSV</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        
        <div className="mb-6 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
          <strong>Mandatory Headers:</strong> Name, Phone, Email, Service Needed
          <br/>
          <strong>Optional Headers:</strong> Requirement
        </div>

        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        <input 
          type="file" 
          accept=".csv"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="w-full mb-6"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
          <button 
            disabled={!file || uploading} 
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload & Create Leads'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchLeads();
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const handleStatusSelect = async (lead: Lead, status: string) => {
    if (status === 'converted' && lead.status !== 'converted') {
      setConvertingLead(lead);
      return;
    }
    
    try {
      await api.patch(`/leads/${lead._id}/status`, { status });
      setLeads(leads.map(l => l._id === lead._id ? { ...l, status: status as any } : l));
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status.');
    }
  };

  const handleConversionSuccess = (leadId: string) => {
    setLeads(leads.map(l => l._id === leadId ? { ...l, status: 'converted' } : l));
    setConvertingLead(null);
  };

  const handleDeleteSuccess = async () => {
    if (!deletingLead) return;
    try {
      await api.delete(`/leads/${deletingLead._id}`);
      setLeads(leads.filter(l => l._id !== deletingLead._id));
      setDeletingLead(null);
    } catch (error) {
      console.error('Failed to delete lead:', error);
      alert('Failed to delete lead.');
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
      (l.businessName && l.businessName.toLowerCase().includes(search.toLowerCase())) ||
      l.phone.includes(search);
    
    const matchesStatus = statusFilter ? l.status === statusFilter : true;
    const matchesType = businessTypeFilter ? l.businessType === businessTypeFilter : true;
    
    let matchesDate = true;
    if (dateFilter) {
      const leadDate = new Date(l.createdAt).toLocaleDateString();
      const filterDate = new Date(dateFilter).toLocaleDateString();
      matchesDate = leadDate === filterDate;
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

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
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCSVModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Upload className="-ml-1 mr-2 h-4 w-4" />
            Upload CSV
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="-ml-1 mr-2 h-4 w-4" />
            Create Lead
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center text-sm font-medium text-gray-700 border-r pr-4">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-40">
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {STATUS_ORDER.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
        <div className="w-48">
          <select 
            value={businessTypeFilter} 
            onChange={e => setBusinessTypeFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Business Types</option>
            {BUSINESS_TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="w-40">
          <input 
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {(search || statusFilter || businessTypeFilter || dateFilter) && (
          <button 
            onClick={() => {
              setSearch('');
              setStatusFilter('');
              setBusinessTypeFilter('');
              setDateFilter('');
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="text-sm text-gray-500">
            Showing {filteredLeads.length} leads
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
            <p className="text-sm mt-1">Try adjusting your filters or add a new lead.</p>
          </div>
        ) : (
          <div className="overflow-x-visible min-h-[400px]">
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
                      <div className="font-medium text-gray-900 flex items-center">
                        {lead.name}
                        {lead.source === 'csv' ? (
                          <span className="ml-2 text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">CSV</span>
                        ) : (
                          <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">WEB</span>
                        )}
                      </div>
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
                      <div className="font-medium text-gray-900">{lead.serviceNeeded.replace(/-/g, ' ')}</div>
                      {lead.requirement && (
                        <div className="text-xs text-gray-500 truncate max-w-[200px] mt-1" title={lead.requirement}>
                          {lead.requirement}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {lead.status === 'converted' ? (
                        <div className="mt-1">{getStatusBadge(lead.status)}</div>
                      ) : (
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusSelect(lead, e.target.value)}
                          className="text-sm bg-transparent border-none cursor-pointer focus:ring-0 p-0 hover:bg-gray-100 rounded outline-none"
                        >
                          {STATUS_ORDER.map((status, idx) => {
                            const currentIdx = STATUS_ORDER.indexOf(lead.status);
                            const disabled = idx < currentIdx;
                            return (
                              <option key={status} value={status} disabled={disabled}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === lead._id ? null : lead._id)}
                        className="text-gray-400 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {openMenuId === lead._id && (
                        <div ref={menuRef} className="absolute right-6 top-10 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                          <button 
                            onClick={() => {
                              setOpenMenuId(null);
                              setDeletingLead(lead);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateLeadModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchLeads();
          }}
        />
      )}

      {convertingLead && (
        <ConvertLeadModal 
          lead={convertingLead} 
          onClose={() => setConvertingLead(null)} 
          onSuccess={handleConversionSuccess} 
        />
      )}

      {deletingLead && (
        <DeleteConfirmModal
          title={deletingLead.name}
          onClose={() => setDeletingLead(null)}
          onConfirm={handleDeleteSuccess}
        />
      )}

      {showCSVModal && (
        <UploadCSVModal
          onClose={() => setShowCSVModal(false)}
          onSuccess={() => {
            setShowCSVModal(false);
            fetchLeads();
            alert('Leads successfully imported!');
          }}
        />
      )}
    </Layout>
  );
}
