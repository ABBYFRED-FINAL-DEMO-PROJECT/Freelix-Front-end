import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import NavigationBar from './layouts/NavigationBar';
import Dashboard from './pages/dashboard/Dashboard';
// import TaskDashboard from './pages/dashboard/TaskDashboard'; 
import Profile from './pages/dashboard/Profile';
import Projects from './pages/dashboard/Projects';
import Invoice from './pages/dashboard/Invoice';
import InvoicePreview from './pages/dashboard/InvoicePreview';
import Proposals from './pages/dashboard/Proposals';
import About from './pages/about/About';
import LandingPage from './pages/LandingPage'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup'; 
import ProjectDetails from './pages/dashboard/ProjectDetails';
import AddProject from './pages/dashboard/AddProject';
import EditProject from './pages/dashboard/EditProject';
import TaskDashboard from './pages/dashboard/TaskDashboard';

// Helper function to check if the user is logged in
const isAuthenticated = () => {
  // Check if token or authentication state exists (e.g., in localStorage)
  return !!localStorage.getItem('token');
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ['/login', '/signup'].includes(location.pathname) || location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideNavbar && <NavigationBar />} {/* Render NavigationBar only if not on login, signup, or dashboard pages */}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<TaskDashboard/>} />
          <Route path="task-dashboard" element={<TaskDashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="invoice-preview/:invoiceId" element={<InvoicePreview />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="profile" element={<Profile />} />
          <Route path="project/:projectId" element={<ProjectDetails />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="edit-project/:projectId" element={<EditProject />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <AppContent />
      </Router>
    </SnackbarProvider>
  );
};

export default App;
