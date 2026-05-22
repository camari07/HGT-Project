import React, { useState } from 'react'
import Layout from './layout/layout'
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login'
import Signup from './pages/signup'
import FarmActivity from './pages/farmact'
import ProfilePage from './pages/profile'
import Maintenance from './pages/maintenance'
import Irrigation from './pages/irrigation'
import ContactPage from './pages/contactpage'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css'

// ========================================================
// SECURITY WRAPPER: Redirects unauthenticated users to login
// ========================================================
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        
        {/* ROOT PATH: Smart landing page routing */}
        <Route path="/" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            {isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          </Layout>
        } />
        
        {/* PUBLIC ROUTES: Anyone can see these */}
        <Route path="/about" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <About />
          </Layout>
        } />
        
        <Route path="/contact" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <ContactPage />
          </Layout>
        } />
        
        <Route path="/login" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            {isLoggedIn ? <Navigate to="/home" replace /> : <Login setIsLoggedIn={setIsLoggedIn}/>}
          </Layout>
        } />
        
        <Route path="/signup" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            {isLoggedIn ? <Navigate to="/home" replace /> : <Signup />}
          </Layout>
        } />

        {/* PROTECTED ROUTES: Guarded by the security wrapper */}
        <Route path="/home" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Home /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/irrigation" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Irrigation /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/farm" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><FarmActivity /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><ProfilePage /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/maintenance" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Maintenance /></Layout>
          </ProtectedRoute>
        } />

        {/* CATCH-ALL FALLBACK: Redirects broken URLs back to safety */}
        <Route path="*" replace element={<Navigate to="/" />} />

      </Routes>
    </Router>
  )
}

export default App;