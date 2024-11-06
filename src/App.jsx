import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider
import NavigationBar from './layouts/NavigationBar';
import Dashboard from './pages/dashboard/Dashboard';
import Overview from './pages/dashboard/Overview'; 
import Profile from './pages/dashboard/Profile';
import Projects from './pages/dashboard/Projects';
import Invoices from './pages/dashboard/Invoices';
import InvoicePreview from './pages/dashboard/InvoicePreview'; // Import the InvoicePreview component
import Proposals from './pages/dashboard/Proposals';
import About from './pages/about/About';
import LandingPage from './pages/LandingPage'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup'; 
import ProjectDetails from './pages/dashboard/ProjectDetails'; // Import the ProjectDetails component
import AddProject from './pages/dashboard/AddProject'; // Import the AddProject component
import EditProject from './pages/dashboard/EditProject'; // Import the EditProject component

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <NavigationBar />} {/* Render NavigationBar only if not in dashboard */}

      <Routes>
        {/* Default route for landing page */}
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/about" element={<About />} />

        {/* Routes for login and signup */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 

        {/* Wrap dashboard routes within a separate path */}
        <Route path="/dashboard" element={<Dashboard />}> 
          <Route index element={<Overview />} /> {/* Default route for Dashboard */}
          <Route path="overview" element={<Overview />} />
          <Route path="projects" element={<Projects />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoice-preview/:invoiceId" element={<InvoicePreview />} /> {/* New route for invoice preview */}
          <Route path="proposals" element={<Proposals />} />
          <Route path="profile" element={<Profile />} />
          <Route path="project/:projectId" element={<ProjectDetails />} /> {/* Route for project details */}
          <Route path="add-project" element={<AddProject />} /> {/* Route for adding a new project */}
          <Route path="edit-project/:projectId" element={<EditProject />} /> {/* Route for editing a project */}
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}> {/* Wrap the component tree with SnackbarProvider */}
      <Router>
        <AppContent />
      </Router>
    </SnackbarProvider>
  );
};

export default App;
