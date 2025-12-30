import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ user, onLogout }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">🔥</span>
          <span className="logo-text">HabitTrackr</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            Dashboard
          </Link>
          <Link to="/habits" className={`nav-link ${isActive('/habits')}`}>
            Habits
          </Link>
          <Link to="/track" className={`nav-link ${isActive('/track')}`}>
            Track
          </Link>
          <Link to="/stats" className={`nav-link ${isActive('/stats')}`}>
            Stats
          </Link>
          <Link to="/settings" className={`nav-link ${isActive('/settings')}`}>
            <span className="profile-icon">👤</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

