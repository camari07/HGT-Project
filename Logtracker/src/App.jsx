import { useState } from 'react'
import Layout from './layout/layout'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

function App() {
 

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
      </Routes>
    </Router>
    <Router>
      <Routes>
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />

      </Routes>
    </Router>
    </>
  )
}

export default App
