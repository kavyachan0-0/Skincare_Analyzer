import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Analyzer from './components/Analyzer';
import './App.css';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
}

function Navigation() {
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="nav-brand">
          <svg className="nav-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L9.5 4.5L12 7L14.5 4.5L12 2Z" fill="white"/>
            <path d="M18.5 8.5L16 11L18.5 13.5L21 11L18.5 8.5Z" fill="white"/>
            <path d="M5.5 8.5L3 11L5.5 13.5L8 11L5.5 8.5Z" fill="white"/>
            <path d="M12 15L9.5 17.5L12 20L14.5 17.5L12 15Z" fill="white"/>
            <path d="M12 7.5C9.5 7.5 7.5 9.5 7.5 12C7.5 14.5 9.5 16.5 12 16.5C14.5 16.5 16.5 14.5 16.5 12C16.5 9.5 14.5 7.5 12 7.5ZM12 14.5C10.6 14.5 9.5 13.4 9.5 12C9.5 10.6 10.6 9.5 12 9.5C13.4 9.5 14.5 10.6 14.5 12C14.5 13.4 13.4 14.5 12 14.5Z" fill="white"/>
          </svg>
          <span className="nav-brand-text">Beauty Advisor</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/history">History</NavLink>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
