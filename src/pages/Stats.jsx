import { useState, useEffect } from 'react'
import { getHabits, getTracking } from '../utils/storage'
import { format, startOfWeek, endOfWeek, eachWeekOfInterval, startOfMonth, endOfMonth, eachDayOfInterval, subDays } from 'date-fns'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'
import './Stats.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Stats = ({ user }) => {
  const [habits, setHabits] = useState([])
  const [weeklyData, setWeeklyData] = useState(null)
  const [monthlyData, setMonthlyData] = useState(null)
  const [pieData, setPieData] = useState(null)
  const [topHabits, setTopHabits] = useState([])

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const userHabits = getHabits(user.id)
    setHabits(userHabits)
    
    calculateWeeklyStats(userHabits)
    calculateMonthlyStats(userHabits)
    calculatePieChart(userHabits)
    calculateTopHabits(userHabits)
  }

  const calculateWeeklyStats = (userHabits) => {
    const now = new Date()
    const fourWeeksAgo = subDays(now, 28)
    const weeks = eachWeekOfInterval({ start: fourWeeksAgo, end: now })
    
    const weekLabels = weeks.map((week, index) => `Week ${index + 1}`)
    const weekCompletions = weeks.map(week => {
      const weekStart = startOfWeek(week)
      const weekEnd = endOfWeek(week)
      const days = eachDayOfInterval({ start: weekStart, end: weekEnd })
      
      let totalPossible = 0
      let totalCompleted = 0
      
      userHabits.forEach(habit => {
        days.forEach(day => {
          const dateStr = format(day, 'yyyy-MM-dd')
          const tracking = getTracking(user.id).find(
            t => t.habitId === habit.id && t.date === dateStr
          )
          totalPossible++
          if (tracking && tracking.completed) {
            totalCompleted++
          }
        })
      })
      
      return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
    })

    setWeeklyData({
      labels: weekLabels,
      datasets: [{
        label: 'Completion %',
        data: weekCompletions,
        backgroundColor: 'rgba(74, 144, 226, 0.8)',
        borderColor: 'rgba(74, 144, 226, 1)',
        borderWidth: 2,
      }]
    })
  }

  const calculateMonthlyStats = (userHabits) => {
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
    
    const dayLabels = days.map(day => format(day, 'MMM d'))
    const dayCompletions = days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd')
      const dayTracking = getTracking(user.id).filter(t => t.date === dateStr && t.completed)
      const totalHabits = userHabits.length
      return totalHabits > 0 ? Math.round((dayTracking.length / totalHabits) * 100) : 0
    })

    setMonthlyData({
      labels: dayLabels,
      datasets: [{
        label: 'Daily Completion %',
        data: dayCompletions,
        borderColor: 'rgba(74, 144, 226, 1)',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      }]
    })
  }

  const calculatePieChart = (userHabits) => {
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
    
    let totalPossible = 0
    let totalCompleted = 0
    
    userHabits.forEach(habit => {
      days.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd')
        const tracking = getTracking(user.id).find(
          t => t.habitId === habit.id && t.date === dateStr
        )
        totalPossible++
        if (tracking && tracking.completed) {
          totalCompleted++
        }
      })
    })
    
    const completed = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
    const remaining = 100 - completed

    setPieData({
      labels: ['Completed', 'Remaining'],
      datasets: [{
        data: [completed, remaining],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(158, 158, 158, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(158, 158, 158, 1)',
        ],
        borderWidth: 2,
      }]
    })
  }

  const calculateTopHabits = (userHabits) => {
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
    
    const habitStats = userHabits.map(habit => {
      let completed = 0
      let total = 0
      
      days.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd')
        const tracking = getTracking(user.id).find(
          t => t.habitId === habit.id && t.date === dateStr
        )
        total++
        if (tracking && tracking.completed) {
          completed++
        }
      })
      
      return {
        ...habit,
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      }
    })
    
    const sorted = habitStats
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10)
    
    setTopHabits(sorted)
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  }

  return (
    <div className="stats-container">
      <div className="stats-content">
        <div className="stats-header">
          <h1>Statistics & Progress</h1>
          <p>Track your habit completion over time</p>
        </div>

        {habits.length === 0 ? (
          <div className="empty-state">
            <p>No habits to show statistics. Add habits first!</p>
          </div>
        ) : (
          <>
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Weekly Progress</h3>
                <div className="chart-wrapper">
                  {weeklyData && (
                    <Bar data={weeklyData} options={{...chartOptions, plugins: {...chartOptions.plugins, title: {display: true, text: 'Weekly Completion %'}}}} />
                  )}
                </div>
              </div>

              <div className="chart-card">
                <h3>Monthly Trend</h3>
                <div className="chart-wrapper">
                  {monthlyData && (
                    <Line data={monthlyData} options={{...chartOptions, plugins: {...chartOptions.plugins, title: {display: true, text: 'Daily Completion Trend'}}}} />
                  )}
                </div>
              </div>

              <div className="chart-card">
                <h3>Monthly Overview</h3>
                <div className="chart-wrapper pie-chart">
                  {pieData && (
                    <Pie data={pieData} options={{...pieOptions, plugins: {...pieOptions.plugins, title: {display: true, text: 'Completion Overview'}}}} />
                  )}
                </div>
                {pieData && (
                  <div className="pie-summary">
                    <div className="summary-item">
                      <span className="summary-label">Completed:</span>
                      <span className="summary-value">{pieData.datasets[0].data[0]}%</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Remaining:</span>
                      <span className="summary-value">{pieData.datasets[0].data[1]}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="top-habits-section">
              <h2>Top 10 Habits Ranking</h2>
              <div className="habits-ranking">
                {topHabits.length === 0 ? (
                  <p className="no-data">No data available yet</p>
                ) : (
                  topHabits.map((habit, index) => (
                    <div key={habit.id} className="ranking-item">
                      <div className="rank-number">#{index + 1}</div>
                      <div className="rank-habit">
                        <span className="rank-icon">{habit.icon || '📝'}</span>
                        <span className="rank-name">{habit.name}</span>
                      </div>
                      <div className="rank-stats">
                        <span className="rank-percentage">{habit.percentage}%</span>
                        <span className="rank-details">({habit.completed}/{habit.total})</span>
                      </div>
                      <div className="rank-bar">
                        <div 
                          className="rank-bar-fill" 
                          style={{ width: `${habit.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Stats

