import { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Users, Briefcase, IndianRupee, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalRevenue: 0,
    pendingRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/projects/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { name: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Pending Payments', value: `₹${stats.pendingRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Active Projects', value: stats.activeProjects, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Projects', value: stats.totalProjects, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back to the BBK Labs control center.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`rounded-md p-3 ${item.bg}`}>
                        <Icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                        <dd>
                          <div className="text-lg font-bold text-gray-900">{item.value}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Placeholder for recent activity or leads table */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <p className="mt-4 text-gray-500 text-sm">No recent activity. As you add projects and leads, they will appear here.</p>
        </div>
      </div>
    </Layout>
  );
}
