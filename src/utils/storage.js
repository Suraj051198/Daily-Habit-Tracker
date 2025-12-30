// Local Storage Utilities for Habit Tracker

const STORAGE_KEYS = {
  USERS: 'habit_tracker_users',
  CURRENT_USER: 'habit_tracker_current_user',
  HABITS: 'habit_tracker_habits',
  TRACKING: 'habit_tracker_tracking',
  THEME: 'habit_tracker_theme'
}

// User Management
export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS)
  return users ? JSON.parse(users) : []
}

export const saveUser = (user) => {
  const users = getUsers()
  const existingUserIndex = users.findIndex(u => u.id === user.id)
  
  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user
  } else {
    users.push(user)
  }
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return user ? JSON.parse(user) : null
}

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }
}

// Habit Management
export const getHabits = (userId) => {
  const habits = localStorage.getItem(STORAGE_KEYS.HABITS)
  const allHabits = habits ? JSON.parse(habits) : []
  return allHabits.filter(h => h.userId === userId)
}

export const saveHabit = (habit) => {
  const habits = localStorage.getItem(STORAGE_KEYS.HABITS)
  const allHabits = habits ? JSON.parse(habits) : []
  
  if (habit.id) {
    // Update existing
    const index = allHabits.findIndex(h => h.id === habit.id)
    if (index >= 0) {
      allHabits[index] = habit
    }
  } else {
    // Create new
    habit.id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    habit.createdAt = new Date().toISOString()
    allHabits.push(habit)
  }
  
  localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(allHabits))
  return habit
}

export const deleteHabit = (habitId) => {
  const habits = localStorage.getItem(STORAGE_KEYS.HABITS)
  const allHabits = habits ? JSON.parse(habits) : []
  const filtered = allHabits.filter(h => h.id !== habitId)
  localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(filtered))
}

// Tracking Management
export const getTracking = (userId, habitId = null) => {
  const tracking = localStorage.getItem(STORAGE_KEYS.TRACKING)
  const allTracking = tracking ? JSON.parse(tracking) : []
  let filtered = allTracking.filter(t => t.userId === userId)
  
  if (habitId) {
    filtered = filtered.filter(t => t.habitId === habitId)
  }
  
  return filtered
}

export const saveTracking = (trackingData) => {
  const tracking = localStorage.getItem(STORAGE_KEYS.TRACKING)
  const allTracking = tracking ? JSON.parse(tracking) : []
  
  // Check if entry exists for this habit, date, and user
  const existingIndex = allTracking.findIndex(
    t => t.habitId === trackingData.habitId &&
         t.date === trackingData.date &&
         t.userId === trackingData.userId
  )
  
  if (existingIndex >= 0) {
    allTracking[existingIndex] = trackingData
  } else {
    trackingData.id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    allTracking.push(trackingData)
  }
  
  localStorage.setItem(STORAGE_KEYS.TRACKING, JSON.stringify(allTracking))
}

export const toggleTracking = (userId, habitId, date, completed) => {
  saveTracking({
    userId,
    habitId,
    date,
    completed
  })
}

// Set tracking for multiple dates (useful for marking all days completed/uncompleted)
export const setTrackingForDates = (userId, habitId, dates = [], completed) => {
  dates.forEach(dateStr => {
    saveTracking({
      userId,
      habitId,
      date: dateStr,
      completed
    })
  })
}

// Theme Management
export const getTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light'
}

export const setTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme)
}

