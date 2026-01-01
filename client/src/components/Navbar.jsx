import { useState } from 'react';
import './Navbar.css';

function Navbar({ activeSection, setActiveSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'places', label: 'Places to Visit', icon: '📍' },
    { id: 'packing', label: 'Packing List', icon: '🎒' },
    { id: 'weather', label: 'Weather', icon: '🌤️' },
    { id: 'accommodations', label: 'Hotels & Homestays', icon: '🏨' },
    { id: 'restaurants', label: 'Food & Restaurants', icon: '🍽️' },
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => setActiveSection('home')}>
          <span className="brand-icon">✈️</span>
          <span className="brand-text">Travel Guide</span>
        </div>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMobileMenuOpen ? 'open' : ''}>☰</span>
        </button>

        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {sections.map(section => (
            <li key={section.id}>
              <button
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;


