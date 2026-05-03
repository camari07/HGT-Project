import { useState } from 'react'
import Layout from './layout/layout'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import React from "react";
import Irrigation from './pages/irrigation'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
 
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/irrigation" element={<Layout><Irrigation /></Layout>} />
      </Routes>
    </Router>

    </>
  )
}

export default App
