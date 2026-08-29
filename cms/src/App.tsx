import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import PortfolioForm from './pages/PortfolioForm';
import Leads from './pages/Leads';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/new" element={<PortfolioForm />} />
        <Route path="/portfolio/edit/:id" element={<PortfolioForm />} />
      </Routes>
    </Router>
  );
}

export default App;
