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
// Import the new Holland Greentech Contact page component
import ContactPage from './pages/ContactPage' 
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
        <Route path="/home" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Home /></Layout>} />
        <Route path="/about" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><About /></Layout>} />
        
        {/* Added Holland Greentech Ghana Contact route here */}
        <Route path="/contact" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><ContactPage /></Layout>} />
        
        <Route path="/login" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn }><Login setIsLoggedIn={setIsLoggedIn}/></Layout>} />
        <Route path="/signup" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Signup /></Layout>} />
        <Route path="/irrigation" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Irrigation /></Layout>} />
        <Route path="/farm" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><FarmActivity /></Layout>} />
        <Route path="/profile" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><ProfilePage /></Layout>} />
        <Route path="/maintenance" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Maintenance /></Layout>} />
      </Routes>
    </Router>

    </>
  )
}

export default App