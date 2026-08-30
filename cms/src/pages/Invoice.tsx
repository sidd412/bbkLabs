import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Printer, ArrowLeft } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  client: string;
  industry?: string;
  status: string;
  totalRevenue: number;
  advancePaid: number;
  services: string[];
  startDate: string;
  deadline?: string;
}

export default function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error('Error fetching project for invoice:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50">Loading invoice...</div>;
  }

  if (!project) {
    return <div className="flex h-screen items-center justify-center bg-gray-50 text-red-500">Project not found</div>;
  }

  const isReceipt = project.advancePaid >= project.totalRevenue;
  const documentTitle = isReceipt ? "PAYMENT RECEIPT" : "INVOICE";
  const documentNumber = `INV-BBK-${project._id.slice(-6).toUpperCase()}`;
  const amountDue = Math.max(0, project.totalRevenue - project.advancePaid);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:py-0 print:bg-white font-sans text-gray-800">
      <style>
        {`
          @media print {
            body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none !important; }
            @page { margin: 0.5cm; }
          }
        `}
      </style>
      
      {/* Controls */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center no-print px-4">
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition-colors"
        >
          <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
        </button>
      </div>

      {/* Invoice Document */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none p-12 print:p-8 rounded-xl print:rounded-none">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black text-blue-600 tracking-tight">BBK Labs</h1>
            <p className="text-gray-500 text-sm mt-1">Your Business. Our Technology.</p>
            <div className="mt-4 text-sm text-gray-600">
              <p>Barabanki, Uttar Pradesh, 225001</p>
              <p>India</p>
              <p className="mt-1">Email: contact@bbklabs.com</p>
              <p>Phone: +91 91290 54029</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-200 tracking-wider uppercase">{documentTitle}</h2>
            <div className="mt-4 flex flex-col items-end gap-1 text-sm text-gray-600">
              <div className="flex justify-between w-48">
                <span className="font-semibold text-gray-700">Invoice No:</span>
                <span>{documentNumber}</span>
              </div>
              <div className="flex justify-between w-48">
                <span className="font-semibold text-gray-700">Date:</span>
                <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</h3>
          <p className="text-xl font-bold text-gray-900">{project.client}</p>
          <p className="text-gray-600 mt-1">{project.industry || 'Business Partner'}</p>
          <p className="text-gray-500 text-sm mt-1">Project: {project.title}</p>
        </div>

        {/* Services Table */}
        <div className="mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700">Description</th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right w-1/4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4 border-b border-gray-100">
                  <div className="font-medium text-gray-900">Custom Technology Services</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Including: {project.services?.join(', ') || 'Development and Setup'}
                  </div>
                </td>
                <td className="py-4 px-4 border-b border-gray-100 text-right font-medium text-gray-900">
                  ₹{project.totalRevenue.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-16">
          <div className="w-80">
            <div className="flex justify-between py-2 text-gray-600">
              <span>Subtotal</span>
              <span>₹{project.totalRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-2 text-green-600 font-medium">
              <span>Amount Paid</span>
              <span>- ₹{project.advancePaid.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-900 mt-2 text-lg font-bold text-gray-900">
              <span>{isReceipt ? 'Total Due' : 'Amount Due'}</span>
              <span>₹{amountDue.toLocaleString('en-IN')}</span>
            </div>
            {isReceipt && (
              <div className="text-center mt-4 border-2 border-green-500 text-green-600 uppercase tracking-wider font-bold py-2 rounded-lg transform -rotate-2">
                PAID IN FULL
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-8 mt-auto text-sm text-gray-500 flex justify-between">
          <div>
            <p className="font-semibold text-gray-700 mb-1">Payment Information</p>
            <p>Please make all payments to BBK Labs.</p>
            <p>For UPI payments: 9129054029@paytm</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-700 mb-1">Terms & Conditions</p>
            <p>Payment is due within 7 days of invoice date.</p>
            <p>Thank you for your business.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
