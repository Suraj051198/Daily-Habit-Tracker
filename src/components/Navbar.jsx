import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ user, onLogout }) => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navRef = useRef(null)
  const profileRef = useRef(null)

  // Close mobile menu or profile dropdown on outside click or when pressing Escape
  useEffect(() => {
    if (!menuOpen && !profileOpen) return

    const handleOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
      if (profileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen, profileOpen])

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const closeMenu = () => setMenuOpen(false)

  const toggleProfile = () => setProfileOpen((s) => !s)

  const closeProfile = () => setProfileOpen(false)

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container" ref={navRef}>
        <Link to="/dashboard" className="navbar-logo" onClick={closeMenu} aria-label="HabitTrackr home">
          <span className="logo-icon" aria-hidden="true">🔥</span>
          <span className="logo-text">HabitTrackr</span>
        </Link>

        <button
          className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((s) => !s)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <div id="navbarSupportedContent" className={`navbar-links ${menuOpen ? 'open' : 'collapsed'}`}>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`} onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to="/habits" className={`nav-link ${isActive('/habits')}`} onClick={closeMenu}>
            Habits
          </Link>
          <Link to="/track" className={`nav-link ${isActive('/track')}`} onClick={closeMenu}>
            Track
          </Link>
          <Link to="/stats" className={`nav-link ${isActive('/stats')}`} onClick={closeMenu}>
            Stats
          </Link>
          {/* Profile dropdown */}
          <div className="dropdown" ref={profileRef}>
            <button
              className={`nav-link profile-toggle ${profileOpen ? 'open' : ''}`}
              aria-haspopup="true"
              aria-expanded={profileOpen}
              onClick={() => { toggleProfile(); closeMenu(); }}
              type="button"
            >
              <span className="profile-icon">👤</span>
            </button>

            <div className={`dropdown-menu ${profileOpen ? 'open' : ''}`} role="menu" aria-hidden={!profileOpen}>
              <Link to="/settings" className="dropdown-item" onClick={() => { closeProfile(); closeMenu(); }}>
                Settings
              </Link>
              <button className="dropdown-item" type="button" onClick={() => { closeProfile(); onLogout && onLogout(); }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

