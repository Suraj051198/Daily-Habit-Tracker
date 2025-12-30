import { addDays, format, isAfter, startOfDay, startOfMonth } from 'date-fns'
import { useEffect, useState } from 'react'
import { getHabits, getTracking, toggleTracking } from '../utils/storage'
import './Track.css'

const Track = ({ user }) => {
  const [habits, setHabits] = useState([])
  const [trackingData, setTrackingData] = useState({})
  const [currentMonth, setCurrentMonth] = useState(() => {
    return new Date()
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const userHabits = getHabits(user.id)
    setHabits(userHabits)

    const allTracking = getTracking(user.id)
    const trackingMap = {}
    
    allTracking.forEach(t => {
      const key = `${t.habitId}-${t.date}`
      trackingMap[key] = t.completed
    })
    
    setTrackingData(trackingMap)
  }

  const handleToggle = (habitId, date) => {
    // Validation: Don't allow checking future dates
    const today = startOfDay(new Date())
    const checkDate = startOfDay(date)
    
    if (isAfter(checkDate, today)) {
      return // Don't allow future dates
    }

    const dateStr = format(date, 'yyyy-MM-dd')
    const key = `${habitId}-${dateStr}`
    const currentStatus = trackingData[key] || false
    const newStatus = !currentStatus
    
    toggleTracking(user.id, habitId, dateStr, newStatus)
    
    setTrackingData({
      ...trackingData,
      [key]: newStatus
    })
  }

  // Get days based on maximum goalDays from all habits
  const getDaysForTracking = () => {
    if (habits.length === 0) return []
    
    const maxGoalDays = Math.max(...habits.map(h => h.goalDays || 30))
    const start = startOfMonth(currentMonth)
    const days = []
    
    for (let i = 0; i < maxGoalDays; i++) {
      days.push(addDays(start, i))
    }
    
    return days
  }

  const trackingDays = getDaysForTracking()

  const getStatus = (habitId, date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const key = `${habitId}-${dateStr}`
    return trackingData[key] || false
  }

  const isFutureDate = (date) => {
    const today = startOfDay(new Date())
    const checkDate = startOfDay(date)
    return isAfter(checkDate, today)
  }

  const isToday = (date) => {
    return format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  }

  return (
    <div className="track-container">
      <div className="track-content">
        <div className="track-header">
          <h1>Track Your Habits</h1>
          <div className="week-navigation">
            <button onClick={() => {
              const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
              setCurrentMonth(prevMonth)
            }}>← Prev</button>
            <span className="current-month">{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={() => {
              const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
              setCurrentMonth(nextMonth)
            }}>Next →</button>
          </div>
        </div>

        {habits.length === 0 ? (
          <div className="empty-state">
            <p>No habits to track. Add habits first!</p>
          </div>
        ) : (
          <div className="track-table-wrapper">
            <table className="track-table">
              <thead>
                <tr>
                  <th className="sticky-col habit-col">DAILY HABITS</th>
                  <th className="sticky-col goal-col">GOALS</th>
                  {trackingDays.map((day) => (
                    <th key={format(day, 'yyyy-MM-dd')} className="day-header-col">
                      <div className="day-header">
                        <div className="day-date">{format(day, 'MMM d')}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {habits.map((habit, habitIndex) => (
                  <tr key={habit.id}>
                    <td className="sticky-col habit-col">
                      <div className="habit-cell">
                        <span className="habit-number">{habitIndex + 1}</span>
                        <span className="habit-icon">{habit.icon || '📝'}</span>
                        <span className="habit-name">{habit.name}</span>
                      </div>
                    </td>
                    <td className="sticky-col goal-col">
                      <div className="goal-cell">
                        <span>{habit.goalDays}</span>
                      </div>
                    </td>
                    {trackingDays.map((day, dayIndex) => {
                      // Only show checkbox if dayIndex is less than habit's goalDays
                      if (dayIndex >= (habit.goalDays || 30)) {
                        return (
                          <td
                            key={`${habit.id}-${format(day, 'yyyy-MM-dd')}`}
                            className="day-cell empty"
                          >
                          </td>
                        )
                      }

                      const isCompleted = getStatus(habit.id, day)
                      const isFuture = isFutureDate(day)
                      const isTodayDate = isToday(day)
                      const dateKey = format(day, 'yyyy-MM-dd')

                      return (
                        <td
                          key={`${habit.id}-${dateKey}`}
                          className={`day-cell ${isCompleted ? 'completed' : ''} ${isTodayDate ? 'today' : ''} ${isFuture ? 'future disabled' : ''}`}
                          onClick={() => !isFuture && handleToggle(habit.id, day)}
                          title={isFuture ? 'Future dates cannot be checked' : `${format(day, 'MMM d, yyyy')} ${isCompleted ? '(Completed)' : '(Pending)'}`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => {}}
                            disabled={isFuture}
                            className="habit-checkbox"
                          />
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Track

