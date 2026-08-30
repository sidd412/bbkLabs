import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, FolderKanban, LogOut, MessageSquare } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'Testimonials', path: '/testimonials', icon: MessageSquare },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">BBK Labs</h2>
        <p className="text-xs text-slate-400 mt-1">Admin Console</p>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white font-medium' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm text-slate-400 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
