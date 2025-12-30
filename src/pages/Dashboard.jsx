import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHabits, getTracking, toggleTracking } from '../utils/storage'
import { format, isToday, startOfDay } from 'date-fns'
import './Dashboard.css'

const Dashboard = ({ user }) => {
  const [habits, setHabits] = useState([])
  const [todayStats, setTodayStats] = useState({ total: 0, completed: 0, percentage: 0 })
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    const userHabits = getHabits(user.id)
    setHabits(userHabits)

    const today = format(new Date(), 'yyyy-MM-dd')
    const todayTracking = getTracking(user.id).filter(t => t.date === today)
    
    const completedToday = todayTracking.filter(t => t.completed).length
    const totalToday = userHabits.length
    const percentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0

    setTodayStats({
      total: totalToday,
      completed: completedToday,
      percentage
    })

    // Calculate streak
    calculateStreak(user.id)
  }

  const calculateStreak = (userId) => {
    const allTracking = getTracking(userId)
    let currentStreak = 0
    const today = new Date()
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      const dateStr = format(checkDate, 'yyyy-MM-dd')
      
      const dayTracking = allTracking.filter(t => t.date === dateStr && t.completed)
      if (dayTracking.length > 0) {
        currentStreak++
      } else if (i > 0) {
        break
      }
    }
    
    setStreak(currentStreak)
  }

  const toggleHabit = (habitId) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const existing = getTracking(user.id).find(
      t => t.habitId === habitId && t.date === today
    )
    
    const completed = !existing || !existing.completed
    
    toggleTracking(user.id, habitId, today, completed)
    
    loadDashboardData()
  }

  const todayHabits = habits.filter(h => {
    const startDate = h.startDate ? new Date(h.startDate) : new Date()
    const today = new Date()
    return startDate <= today
  })

  const getTodayStatus = (habitId) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const tracking = getTracking(user.id).find(
      t => t.habitId === habitId && t.date === today
    )
    return tracking && tracking.completed
  }

  const motivationQuotes = [
    "Every day is a fresh start! 🌟",
    "Small steps lead to big changes! 💪",
    "You're doing great! Keep it up! 🔥",
    "Progress, not perfection! ✨",
    "Today is the perfect day to start! 🚀"
  ]

  const randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {user.name}! 👋</h1>
          <p className="dashboard-subtitle">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card progress-card">
            <div className="stat-header">
              <h3>Today's Progress</h3>
              <span className="stat-icon">🔥</span>
            </div>
            <div className="progress-circle">
              <svg className="progress-ring" width="120" height="120">
                <circle
                  className="progress-ring-background"
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="8"
                />
                <circle
                  className="progress-ring-progress"
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - todayStats.percentage / 100)}`}
                />
              </svg>
              <div className="progress-text">
                <span className="progress-percentage">{todayStats.percentage}%</span>
                <span className="progress-label">Completed</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Habits</h3>
              <span className="stat-icon">📋</span>
            </div>
            <div className="stat-value">{todayStats.total}</div>
            <div className="stat-label">Active habits today</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Completed</h3>
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-value">{todayStats.completed}</div>
            <div className="stat-label">Done today</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Current Streak</h3>
              <span className="stat-icon">🔥</span>
            </div>
            <div className="stat-value">{streak}</div>
            <div className="stat-label">Days in a row</div>
          </div>
        </div>

        <div className="motivation-card">
          <p className="motivation-text">{randomQuote}</p>
        </div>

        <div className="today-habits-section">
          <div className="section-header">
            <h2>Today's Habits</h2>
            <Link to="/habits" className="add-habit-link">
              + Add Habit
            </Link>
          </div>

          {todayHabits.length === 0 ? (
            <div className="empty-state">
              <p>No habits yet. Start by adding your first habit!</p>
              <Link to="/habits" className="primary-button">
                + Add Your First Habit
              </Link>
            </div>
          ) : (
            <div className="habits-list">
              {todayHabits.map(habit => {
                const isCompleted = getTodayStatus(habit.id)
                return (
                  <div key={habit.id} className={`habit-item ${isCompleted ? 'completed' : ''}`}>
                    <div className="habit-checkbox" onClick={() => toggleHabit(habit.id)}>
                      {isCompleted ? '☑️' : '⬜️'}
                    </div>
                    <div className="habit-info">
                      <span className="habit-icon">{habit.icon || '📝'}</span>
                      <span className="habit-name">{habit.name}</span>
                    </div>
                    <div className="habit-category">{habit.category || 'Personal'}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

