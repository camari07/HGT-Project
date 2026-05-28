import { useState } from 'react'
import Layout from './layout/layout'
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login'
import Signup from './pages/signup'
import FarmActivity from './pages/farmact'
import ProfilePage from './pages/profile'
import Maintenance from './pages/maintenance'
import React from "react";
import Irrigation from './pages/irrigation'
import Report from './pages/report'
import ProtectedRoute from './components/protectroute'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <>
 
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              {isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          </Layout>
}         />
        <Route path="/home" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          </Layout>} />
        <Route path="/about" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><About /></Layout>} />
        <Route path="/login" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn }><Login setIsLoggedIn={setIsLoggedIn}/></Layout>} />
        <Route path="/signup" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Signup /></Layout>} />
        <Route path="/irrigation" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Irrigation />
            </ProtectedRoute>
          </Layout>} />
        <Route path="/farm" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FarmActivity />
            </ProtectedRoute>
          </Layout>} />
        <Route path="/profile" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfilePage />
            </ProtectedRoute>
          </Layout>} />
        <Route path="/maintenance" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Maintenance />
            </ProtectedRoute>
          </Layout>} />
        <Route path="/report" element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Report />
            </ProtectedRoute>
          </Layout>} />
      </Routes>
    </Router>

    </>
  )
}

export default App