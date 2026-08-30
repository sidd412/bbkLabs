import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import PortfolioForm from './pages/PortfolioForm';
import Leads from './pages/Leads';
import Projects from './pages/Projects';
import ProjectForm from './pages/ProjectForm';
import Testimonials from './pages/Testimonials';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<ProjectForm />} />
        <Route path="/projects/edit/:id" element={<ProjectForm />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/new" element={<PortfolioForm />} />
        <Route path="/portfolio/edit/:id" element={<PortfolioForm />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </Router>
  );
}

export default App;
