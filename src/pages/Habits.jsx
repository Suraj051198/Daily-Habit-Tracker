import { useEffect, useState } from 'react'
import { deleteHabit, getHabits, saveHabit } from '../utils/storage'
import './Habits.css'

const Habits = ({ user }) => {
  const [habits, setHabits] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingHabit, setEditingHabit] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    icon: '📝',
    category: 'Personal',
    goalDays: 30,
    reminderTime: ''
  })

  const categories = ['Health', 'Study', 'Finance', 'Personal', 'Fitness', 'Work']
  const icons = ['🔥', '☕', '📚', '🧘', '🏋️', '💧', '🌅', '📖', '🎯', '💪', '🧠', '❤️', '📝', '🎨', '🎵']

  useEffect(() => {
    loadHabits()
  }, [])

  const loadHabits = () => {
    const userHabits = getHabits(user.id)
    setHabits(userHabits)
  }

  const handleOpenModal = (habit = null) => {
    if (habit) {
      setEditingHabit(habit)
      setFormData({
        name: habit.name,
        icon: habit.icon || '📝',
        category: habit.category || 'Personal',
        goalDays: habit.goalDays || 30,
        reminderTime: habit.reminderTime || ''
      })
    } else {
      setEditingHabit(null)
      setFormData({
        name: '',
        icon: '📝',
        category: 'Personal',
        goalDays: 30,
        reminderTime: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingHabit(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const habitData = {
      ...formData,
      userId: user.id,
      startDate: editingHabit ? editingHabit.startDate : new Date().toISOString(),
      goalDays: parseInt(formData.goalDays)
    }

    if (editingHabit) {
      habitData.id = editingHabit.id
    }

    saveHabit(habitData)
    loadHabits()
    handleCloseModal()
  }

  const handleDelete = (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(habitId)
      loadHabits()
    }
  }

  return (
    <div className="habits-container">
      <div className="habits-content">
        <div className="habits-header">
          <h1>My Habits</h1>
          <button className="add-habit-button" onClick={() => handleOpenModal()}>
            + Add New Habit
          </button>
        </div>

        {habits.length === 0 ? (
          <div className="empty-state">
            <p>No habits yet. Create your first habit to start tracking!</p>
            <button className="primary-button" onClick={() => handleOpenModal()}>
              + Add Your First Habit
            </button>
          </div>
        ) : (
          <div className="habits-grid">
            {habits.map(habit => (
              <div key={habit.id} className="habit-card">
                <div className="habit-card-header">
                  <span className="habit-card-icon">{habit.icon || '📝'}</span>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(habit.id)}
                    title="Delete habit"
                  >
                    🗑️
                  </button>
                </div>
                <div className="habit-card-body">
                  <h3>{habit.name}</h3>
                  <div className="habit-card-meta">
                    <span className="habit-card-category">{habit.category || 'Personal'}</span>
                    <span className="habit-card-goal">Goal: {habit.goalDays} days</span>
                  </div>
                </div>
                <div className="habit-card-footer">
                  <button
                    className="edit-button"
                    onClick={() => handleOpenModal(habit)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingHabit ? 'Edit Habit' : 'Add New Habit'}</h2>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="habit-form">
              <div className="form-group">
                <label htmlFor="name">Habit Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g., Wake up at 6AM"
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon">Icon</label>
                <div className="icon-picker">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, icon })}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="goalDays">Goal Days</label>
                <input
                  type="number"
                  id="goalDays"
                  value={formData.goalDays}
                  onChange={(e) => setFormData({ ...formData, goalDays: e.target.value })}
                  required
                  min="1"
                  max="365"
                />
              </div>

              <div className="form-group">
                <label htmlFor="reminderTime">Reminder Time (Optional)</label>
                <input
                  type="time"
                  id="reminderTime"
                  value={formData.reminderTime}
                  onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  {editingHabit ? 'Update' : 'Save'} Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Habits

