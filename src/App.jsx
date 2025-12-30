import { useEffect, useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Habits from './pages/Habits'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Stats from './pages/Stats'
import Track from './pages/Track'
import { getCurrentUser, getTheme, setCurrentUser } from './utils/storage'

function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    const savedTheme = getTheme()
    setUser(currentUser)
    setTheme(savedTheme || 'light')
    document.documentElement.setAttribute('data-theme', savedTheme || 'light')
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setUser(null)
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/*" element={
          user ? (
            <>
              <Navbar user={user} onLogout={handleLogout} />
              <Routes>
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/habits" element={<Habits user={user} />} />
                <Route path="/track" element={<Track user={user} />} />
                <Route path="/stats" element={<Stats user={user} />} />
                <Route path="/settings" element={<Settings user={user} onThemeChange={handleThemeChange} theme={theme} />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  )
}

export default App

