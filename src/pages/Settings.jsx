import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers, saveUser, setCurrentUser, setTheme, getTheme } from '../utils/storage'
import { getHabits, getTracking } from '../utils/storage'
import './Settings.css'

const Settings = ({ user, onThemeChange, theme }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    onThemeChange(newTheme)
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const users = getUsers()
    const userIndex = users.findIndex(u => u.id === user.id)

    if (userIndex >= 0) {
      const updatedUser = {
        ...users[userIndex],
        name: formData.name,
        email: formData.email
      }
      users[userIndex] = updatedUser
      localStorage.setItem('habit_tracker_users', JSON.stringify(users))
      setCurrentUser(updatedUser)
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const users = getUsers()
    const currentUserData = users.find(u => u.id === user.id)

    if (currentUserData.password !== formData.currentPassword) {
      setError('Current password is incorrect')
      return
    }

    currentUserData.password = formData.newPassword
    localStorage.setItem('habit_tracker_users', JSON.stringify(users))
    setCurrentUser(currentUserData)
    
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setSuccess('Password changed successfully!')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleExportData = () => {
    const habits = getHabits(user.id)
    const tracking = getTracking(user.id)

    const exportData = {
      user: {
        name: user.name,
        email: user.email
      },
      habits: habits,
      tracking: tracking,
      exportDate: new Date().toISOString()
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `habit-tracker-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setSuccess('Data exported successfully!')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleExportCSV = () => {
    const habits = getHabits(user.id)
    const tracking = getTracking(user.id)

    // Create CSV header
    let csv = 'Habit Name,Date,Completed\n'

    // Add tracking data
    tracking.forEach(t => {
      const habit = habits.find(h => h.id === t.habitId)
      if (habit) {
        csv += `"${habit.name}","${t.date}","${t.completed ? 'Yes' : 'No'}"\n`
      }
    })

    const dataBlob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `habit-tracker-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setSuccess('CSV exported successfully!')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    navigate('/login')
  }

  return (
    <div className="settings-container">
      <div className="settings-content">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="settings-sections">
          <div className="settings-section">
            <h2>Profile</h2>
            <form onSubmit={handleProfileUpdate} className="settings-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="save-button">
                Update Profile
              </button>
            </form>
          </div>

          <div className="settings-section">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange} className="settings-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="save-button">
                Change Password
              </button>
            </form>
          </div>

          <div className="settings-section">
            <h2>Appearance</h2>
            <div className="theme-toggle">
              <div className="theme-info">
                <span className="theme-label">Dark Mode</span>
                <span className="theme-description">Toggle between light and dark theme</span>
              </div>
              <button
                className={`theme-switch ${theme === 'dark' ? 'active' : ''}`}
                onClick={handleThemeToggle}
              >
                <span className="switch-slider"></span>
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h2>Data Export</h2>
            <div className="export-options">
              <p className="export-description">Download your habit tracking data</p>
              <div className="export-buttons">
                <button onClick={handleExportData} className="export-button">
                  Export JSON
                </button>
                <button onClick={handleExportCSV} className="export-button">
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section danger-section">
            <h2>Account</h2>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

