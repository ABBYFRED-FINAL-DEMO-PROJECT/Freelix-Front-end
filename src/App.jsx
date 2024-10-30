// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar';
import Dashboard from './pages/dashboard/Dashboard';
import Overview from './pages/dashboard/Overview'; 
import Profile from './pages/dashboard/Profile';
import Projects from './pages/dashboard/Projects';
import Invoices from './pages/dashboard/Invoices';
import Proposals from './pages/dashboard/Proposals';
import About from './pages/about/About';
import LandingPage from './pages/LandingPage'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup'; 
const App = () => {
  return (
    <Router>
      <NavigationBar /> 

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
          <Route path="proposals" element={<Proposals />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
