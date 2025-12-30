import { addDays, format, isAfter, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { getHabits, getTracking, toggleTracking } from '../utils/storage'
import './Track.css'

const Track = ({ user }) => {
  const [habits, setHabits] = useState([])
  const [trackingData, setTrackingData] = useState({})

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

  // Get days to display for a specific habit based on goalDays
  const getDaysForHabit = (habit) => {
    const startDate = habit.startDate ? new Date(habit.startDate) : new Date()
    const habitStart = startOfDay(startDate)
    const today = startOfDay(new Date())
    
    // Use today as start if habit start date is in future
    const actualStart = isAfter(habitStart, today) ? today : habitStart
    
    const days = []
    const goalDays = habit.goalDays || 30
    
    for (let i = 0; i < goalDays; i++) {
      const day = addDays(actualStart, i)
      days.push(day)
    }
    
    return days
  }

  // Get all unique days across all habits for header (showing all dates from all habits)
  const getAllDays = () => {
    const allDaysSet = new Set()
    
    habits.forEach(habit => {
      const habitDays = getDaysForHabit(habit)
      habitDays.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd')
        allDaysSet.add(dateStr)
      })
    })
    
    const allDays = Array.from(allDaysSet)
      .map(dateStr => new Date(dateStr))
      .sort((a, b) => a - b)
    
    return allDays
  }

  const allDays = getAllDays()
  
  // Get maximum goal days to determine header width
  const getMaxGoalDays = () => {
    if (habits.length === 0) return 0
    return Math.max(...habits.map(h => h.goalDays || 30))
  }
  
  const maxGoalDays = getMaxGoalDays()

  const getStatus = (habitId, date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const key = `${habitId}-${dateStr}`
    return trackingData[key] || false
  }

  const getCompletionCount = (habitId, habitDays) => {
    return habitDays.filter(day => getStatus(habitId, day)).length
  }

  const isFutureDate = (date) => {
    const today = startOfDay(new Date())
    const checkDate = startOfDay(date)
    return isAfter(checkDate, today)
  }

  return (
    <div className="track-container">
      <div className="track-content">
        <div className="track-header">
          <h1>Track Your Habits</h1>
          {habits.length > 0 && (
            <div className="date-range-info">
              <span className="info-text">Each habit shows all days from Day 1 to Day {maxGoalDays}</span>
            </div>
          )}
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
                  <th className="sticky-col habit-col">Habit Name</th>
                  <th className="goal-col">Goal</th>
                  {habits.length > 0 && (() => {
                    // Get earliest start date and latest end date from all habits
                    let earliestStart = new Date()
                    let latestEnd = new Date()
                    
                    habits.forEach(habit => {
                      const habitDays = getDaysForHabit(habit)
                      if (habitDays.length > 0) {
                        const habitStart = habitDays[0]
                        const habitEnd = habitDays[habitDays.length - 1]
                        
                        if (habitStart < earliestStart) {
                          earliestStart = habitStart
                        }
                        if (habitEnd > latestEnd) {
                          latestEnd = habitEnd
                        }
                      }
                    })
                    
                    // Create sequential dates from earliest start to latest end
                    const allDates = []
                    let currentDate = new Date(earliestStart)
                    const endDate = new Date(latestEnd)
                    
                    while (currentDate <= endDate) {
                      allDates.push(new Date(currentDate))
                      currentDate = addDays(currentDate, 1)
                    }
                    
                    return allDates.map((day, dayIndex) => (
                      <th key={`header-${format(day, 'yyyy-MM-dd')}`} className="day-col">
                        <div className="day-header">
                          <div className="day-number">{format(day, 'd')}</div>
                          <div className="day-name">{format(day, 'EEE')}</div>
                          <div className="day-month">{format(day, 'MMM')}</div>
                          <div className="day-year">{format(day, 'yyyy')}</div>
                        </div>
                      </th>
                    ))
                  })()}
                </tr>
              </thead>
              <tbody>
                {habits.map(habit => {
                  const habitDays = getDaysForHabit(habit)
                  const completed = getCompletionCount(habit.id, habitDays)
                  const percentage = habit.goalDays > 0 ? Math.round((completed / habit.goalDays) * 100) : 0
                  
                  // Get earliest start date and latest end date (same as header)
                  let earliestStart = new Date()
                  let latestEnd = new Date()
                  
                  habits.forEach(h => {
                    const hDays = getDaysForHabit(h)
                    if (hDays.length > 0) {
                      const hStart = hDays[0]
                      const hEnd = hDays[hDays.length - 1]
                      
                      if (hStart < earliestStart) {
                        earliestStart = hStart
                      }
                      if (hEnd > latestEnd) {
                        latestEnd = hEnd
                      }
                    }
                  })
                  
                  // Create sequential dates from earliest start to latest end (same as header)
                  const allDates = []
                  let currentDate = new Date(earliestStart)
                  const endDate = new Date(latestEnd)
                  
                  while (currentDate <= endDate) {
                    allDates.push(new Date(currentDate))
                    currentDate = addDays(currentDate, 1)
                  }
                  
                  return (
                    <tr key={habit.id}>
                      <td className="sticky-col habit-col">
                        <div className="habit-cell">
                          <span className="habit-icon">{habit.icon || '📝'}</span>
                          <span className="habit-name">{habit.name}</span>
                        </div>
                      </td>
                      <td className="goal-col">
                        <div className="goal-cell">
                          <span>{habit.goalDays}</span>
                          <span className="goal-progress">({completed}/{habit.goalDays})</span>
                        </div>
                      </td>
                      {allDates.map((headerDate, dateIndex) => {
                        // Find if this date exists in this habit's days
                        const headerDateStr = format(headerDate, 'yyyy-MM-dd')
                        const habitDay = habitDays.find(d => format(d, 'yyyy-MM-dd') === headerDateStr)
                        
                        // If this date is not part of this habit's tracking period, show empty cell
                        if (!habitDay) {
                          return <td key={dateIndex} className="day-cell disabled empty"></td>
                        }
                        
                        // Show checkbox for this actual date
                        const isCompleted = getStatus(habit.id, habitDay)
                        const isPast = habitDay < new Date() && format(habitDay, 'yyyy-MM-dd') !== format(new Date(), 'yyyy-MM-dd')
                        const isToday = format(habitDay, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                        const isFuture = isFutureDate(habitDay)
                        
                        return (
                          <td
                            key={dateIndex}
                            className={`day-cell ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''} ${isPast ? 'past' : ''} ${isFuture ? 'future disabled' : ''}`}
                            onClick={() => !isFuture && handleToggle(habit.id, habitDay)}
                            title={isFuture ? 'Future dates cannot be checked' : `${format(habitDay, 'MMM d, yyyy')} ${isCompleted ? '(Completed)' : '(Pending)'}`}
                          >
                            {isCompleted ? '☑️' : '⬜️'}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="track-legend">
          <div className="legend-item">
            <span className="legend-box completed">☑️</span>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <span className="legend-box">⬜️</span>
            <span>Pending</span>
          </div>
          <div className="legend-item">
            <span className="legend-box today">⬜️</span>
            <span>Today</span>
          </div>
          <div className="legend-item">
            <span className="legend-box disabled">⬜️</span>
            <span>Future (Disabled)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Track

