# 🔥 HabitTrackr - Daily Habit & Activity Tracker

A modern, responsive web application for tracking daily habits and activities. Built with React, Vite, and Chart.js.

## ✨ Features

- **User Authentication**: Login and register with email/password
- **Dashboard**: Overview of today's progress, quick stats, and current streak
- **Habit Management**: Add, edit, and delete habits with custom icons and categories
- **Daily Tracking**: Excel-style calendar view for tracking habit completion
- **Statistics & Charts**: 
  - Weekly progress bar charts
  - Monthly trend line charts
  - Completion pie charts
  - Top 10 habits ranking
- **Settings**: 
  - Profile management
  - Password change
  - Dark/Light mode toggle
  - Data export (JSON & CSV)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to Netlify or any static hosting service.

## 📁 Project Structure

```
src/
├── components/       # Reusable components (Navbar, etc.)
├── pages/           # Page components (Dashboard, Habits, Track, Stats, Settings)
├── utils/           # Utility functions (localStorage management)
├── App.jsx          # Main app component with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## 🗄️ Data Storage

This app uses **localStorage** to store all data:
- User accounts
- Habits
- Daily tracking data
- Theme preferences

**Note**: Data is stored locally in the browser. Clearing browser data will remove all stored information.

## 🎨 Features in Detail

### Dashboard
- Today's completion percentage with circular progress indicator
- Quick stats: Total habits, completed today, current streak
- Today's habits list with quick toggle
- Motivational quotes

### Habits Management
- Create habits with:
  - Custom name
  - Emoji icon selection
  - Category (Health, Study, Finance, Personal, Fitness, Work)
  - Goal days (1-365)
  - Optional reminder time
- Edit and delete existing habits

### Daily Tracking
- Excel-style calendar view
- Month navigation
- Click to toggle completion
- Visual indicators for completed, pending, and today
- Sticky habit name column for horizontal scrolling

### Statistics
- **Weekly Progress**: Bar chart showing completion % for last 4 weeks
- **Monthly Trend**: Line chart showing daily completion trends
- **Completion Overview**: Pie chart with completed vs remaining percentage
- **Top 10 Habits**: Ranked list based on monthly completion percentage

### Settings
- Update profile (name, email)
- Change password
- Toggle dark/light theme
- Export data as JSON or CSV
- Logout

## 🎯 Usage

1. **Register/Login**: Create an account or login
2. **Add Habits**: Go to Habits page and add your daily habits
3. **Track Daily**: Use the Track page to mark habits as complete each day
4. **View Progress**: Check Stats page for visual progress reports
5. **Customize**: Adjust settings, theme, and export your data

## 📖 How to Use This Web Application - Complete Guide

This comprehensive guide will walk you through every feature of HabitTrackr step by step.

---

### 🔐 Step 1: Registration & Login

#### **Register a New Account**

1. When you first open the app, you'll see the **Login** page
2. Click on **"Sign up"** link at the bottom of the login form
3. Fill in the registration form:
   - **Full Name**: Enter your name (e.g., "John Doe")
   - **Email**: Enter a valid email address (e.g., "john@example.com")
   - **Password**: Create a password (minimum 6 characters)
   - **Confirm Password**: Re-enter your password to confirm
4. Click **"Sign Up"** button
5. You'll be automatically logged in and redirected to the Dashboard

<img width="633" height="873" alt="image" src="https://github.com/user-attachments/assets/6be969fb-48b3-4630-accb-ad4456632913" />

#### **Login to Your Account**

1. On the Login page, enter your registered email and password
2. Click **"Sign In"** button
3. You'll be redirected to your Dashboard

<img width="737" height="781" alt="image" src="https://github.com/user-attachments/assets/565ac31f-15a6-404e-afa2-e409697e3770" />


**Note**: All accounts are stored locally in your browser. Each browser/device will have separate accounts.

---

### 🏠 Step 2: Understanding the Dashboard

After logging in, you'll see the **Dashboard** - your home page with an overview of your progress.

#### **Dashboard Features:**

1. **Welcome Section**
   - Shows your name and today's date
   - Personalized greeting message

2. **Today's Progress Card**
   - Circular progress indicator showing completion percentage
   - Displays how many habits you've completed today
   - Example: "75% Completed" means you finished 3 out of 4 habits

3. **Quick Stats Cards**
   - **Total Habits**: Number of active habits you have
   - **Completed**: How many habits you've finished today
   - **Current Streak**: Consecutive days you've completed at least one habit

4. **Motivation Quote**
   - Daily inspirational message to keep you motivated

5. **Today's Habits List**
   - Shows all your active habits for today
   - Each habit displays:
     - Checkbox (☑️ = completed, ⬜️ = pending)
     - Emoji icon
     - Habit name
     - Category badge
   - **Quick Action**: Click the checkbox to mark a habit as complete/incomplete
   - **Add Habit Button**: Click "+ Add Habit" to create a new habit

#### **How to Use Dashboard:**

- **Mark Habits Complete**: Click the checkbox (⬜️) next to any habit to mark it as done (☑️)
- **View All Habits**: Click on "Habits" in the navigation bar to manage all your habits
- **Track Progress**: Click on "Track" to see the calendar view
- **View Statistics**: Click on "Stats" to see detailed progress charts
<img width="975" height="785" alt="image" src="https://github.com/user-attachments/assets/aed534d7-d8f8-40b3-abbb-9c7516a284d4" />

<img width="886" height="790" alt="image" src="https://github.com/user-attachments/assets/05c383b4-1e0e-4d90-b03a-2d7f0442c005" />


---

### ➕ Step 3: Adding & Managing Daily Habits

Navigate to the **Habits** page from the top navigation bar.

#### **Adding a New Habit:**

1. Click the **"+ Add New Habit"** button (top right corner)
2. A modal form will appear with the following fields:

   **Habit Name** (Required)
   - Enter a descriptive name for your habit
   - Examples: "Wake up at 6AM", "Drink 3L Water", "Study 1 hour", "Meditation"

   **Icon** (Required)
   - Click on any emoji icon from the grid to select it
   - Available icons: 🔥 ☕ 📚 🧘 🏋️ 💧 🌅 📖 🎯 💪 🧠 ❤️ 📝 🎨 🎵
   - The selected icon will be highlighted in blue

   **Category** (Required)
   - Select from dropdown: Health, Study, Finance, Personal, Fitness, Work
   - Helps organize your habits

   **Goal Days** (Required)
   - Enter number of days you want to track this habit (1-365)
   - Default: 30 days
   - Examples: 30, 31, 60, 90 days

   **Reminder Time** (Optional)
   - Select a time when you want to be reminded
   - Format: HH:MM (24-hour format)
   - Example: 06:00, 18:30

3. Click **"Save Habit"** button
4. Your new habit will appear in the habits grid

   <img width="515" height="818" alt="image" src="https://github.com/user-attachments/assets/13c647ab-aed8-490c-949c-13bfcaccb01b" />


#### **Viewing Your Habits:**

- All your habits are displayed as cards in a grid layout
- Each card shows:
  - Emoji icon
  - Habit name
  - Category badge
  - Goal days
  - Edit and Delete buttons

#### **Editing a Habit:**

1. Find the habit card you want to edit
2. Click the **"Edit"** button on the card
3. The same form will open with pre-filled values
4. Modify any field you want to change
5. Click **"Update Habit"** to save changes

#### **Deleting a Habit:**

1. Find the habit card you want to delete
2. Click the **🗑️** (trash) icon in the top right of the card
3. Confirm the deletion in the popup
4. The habit and all its tracking data will be removed

**Note**: You can add unlimited habits. There's no limit!

<img width="1178" height="729" alt="image" src="https://github.com/user-attachments/assets/e4e95577-24ef-405a-9014-4db7d93e837a" />


---

### 📋 Step 4: Daily Tracking (Excel-Style Calendar View)

Navigate to the **Track** page from the top navigation bar.

#### **Understanding the Track Page:**

This page shows an Excel-style table with:
- **Left Column**: Habit names with icons (sticky - stays visible when scrolling)
- **Second Column**: Goal days and current progress (e.g., "30 (15/30)")
- **Date Columns**: Each day of the current month
  - Day number and weekday abbreviation (e.g., "1 Mon")
  - Checkbox for each habit on each day

#### **How to Track Your Habits:**

1. **Navigate Months**:
   - Use **←** (left arrow) to go to previous month
   - Use **→** (right arrow) to go to next month
   - Current month is displayed at the top

2. **Mark Habits Complete**:
   - Click on any checkbox (⬜️) in the calendar
   - It will change to ☑️ (completed)
   - Click again to unmark it

3. **Visual Indicators**:
   - **☑️ Green background**: Habit completed on that day
   - **⬜️ White background**: Habit not completed
   - **Blue border**: Today's date
   - **Faded appearance**: Past dates

4. **View Progress**:
   - Each habit row shows: "Goal: 30 (15/30)"
   - First number (15) = days completed
   - Second number (30) = total goal days

#### **Tips for Tracking:**

- **Daily Routine**: Check the Track page every evening to mark completed habits
- **Quick Toggle**: Click any checkbox to instantly mark/unmark
- **Scroll Horizontally**: Use horizontal scroll to see all days of the month
- **Sticky Column**: Habit names stay visible while scrolling through dates

---



### 📊 Step 5: Statistics & Progress

Navigate to the **Stats** page from the top navigation bar.

#### **Weekly Progress Chart (Bar Chart):**

- Shows completion percentage for the last 4 weeks
- Each bar represents one week
- Height of bar = completion percentage
- Example: Week 1: 78%, Week 2: 85%, Week 3: 72%, Week 4: 80%
- **How to Read**: Higher bars = better consistency

#### **Monthly Trend Chart (Line Chart):**

- Shows daily completion trends for the current month
- X-axis: Days of the month
- Y-axis: Completion percentage (0-100%)
- Smooth line connecting daily data points
- **How to Read**: 
  - Upward trend = improving consistency
  - Flat line = consistent performance
  - Downward trend = need to refocus

#### **Monthly Overview (Pie Chart):**

- Visual representation of overall completion
- Two segments:
  - **Green**: Completed percentage
  - **Gray**: Remaining percentage
- Summary below shows exact percentages
- **How to Read**: Larger green section = better progress

#### **Top 10 Habits Ranking:**

- Ranked list of your best-performing habits
- Shows:
  - **Rank Number**: #1, #2, #3, etc.
  - **Habit Icon & Name**: Visual identification
  - **Completion Percentage**: How well you're doing
  - **Progress Details**: (completed/total) format
  - **Progress Bar**: Visual representation of percentage
- **How to Read**: 
  - #1 = Your best habit (highest completion %)
  - Lower ranks = Habits that need more attention
  - Use this to identify which habits you're most consistent with

#### **Using Statistics Effectively:**

1. **Weekly Review**: Check weekly progress every Sunday
2. **Identify Patterns**: Look for trends in the line chart
3. **Focus Areas**: Use top habits ranking to see what's working
4. **Set Goals**: Aim to improve percentages week over week

---
<img width="993" height="850" alt="image" src="https://github.com/user-attachments/assets/ee7d0e37-b8cc-4336-b341-525fb9ea0cfb" />

<img width="966" height="852" alt="image" src="https://github.com/user-attachments/assets/c1534376-7f45-41df-8cea-000057b456c8" />

### ⚙️ Step 6: Settings & Customization

Navigate to the **Settings** page from the top navigation bar (click the 👤 profile icon).

#### **Profile Management:**

1. **Update Profile Information**:
   - **Full Name**: Change your display name
   - **Email**: Update your email address
   - Click **"Update Profile"** to save changes
   - Success message will appear

#### **Change Password:**

1. Enter your **Current Password**
2. Enter your **New Password** (minimum 6 characters)
3. **Confirm New Password** (must match new password)
4. Click **"Change Password"** button
5. Success message will appear
6. Form will clear automatically

**Important**: Remember your new password! There's no password recovery option.

#### **Appearance Settings:**

1. **Dark Mode Toggle**:
   - Toggle switch on the right side
   - **OFF (Light Mode)**: White background, dark text
   - **ON (Dark Mode)**: Dark background, light text
   - Click the switch to toggle
   - Your preference is saved automatically
   - Applies immediately across all pages

#### **Data Export:**

Export your habit tracking data for backup or analysis:

1. **Export JSON**:
   - Click **"Export JSON"** button
   - Downloads a JSON file with all your data:
     - User information
     - All habits
     - All tracking records
     - Export date
   - File name: `habit-tracker-export-YYYY-MM-DD.json`
   - Use this for complete backup

2. **Export CSV**:
   - Click **"Export CSV"** button
   - Downloads a CSV file (spreadsheet format)
   - Contains: Habit Name, Date, Completed (Yes/No)
   - File name: `habit-tracker-export-YYYY-MM-DD.csv`
   - Open in Excel, Google Sheets, or any spreadsheet app
   - Perfect for data analysis

**When to Export**:
- Regular backups (weekly/monthly)
- Before clearing browser data
- For data analysis in spreadsheets
- To share progress with others

#### **Logout:**

1. Scroll to the bottom of Settings page
2. Click the red **"Logout"** button
3. You'll be logged out and redirected to Login page
4. All data remains saved in your browser

---
<img width="983" height="851" alt="image" src="https://github.com/user-attachments/assets/3aea77b5-78a3-45bc-86e1-b7265d885c81" />


<img width="938" height="907" alt="image" src="https://github.com/user-attachments/assets/b53a0e7d-becb-4875-a247-33909958d38d" />

## 🎯 Complete Workflow Example

Here's a typical day using HabitTrackr:

### **Morning Routine:**

1. **Login** to your account
2. Check **Dashboard** to see today's habits
3. Mark completed morning habits (e.g., "Wake up at 6AM" ☑️)

### **Throughout the Day:**

4. Visit **Track** page to mark habits as you complete them
5. Check **Dashboard** to see your progress percentage

### **Evening Review:**

6. Go to **Track** page and mark all completed habits for the day
7. Check **Dashboard** to see final completion percentage
8. View **Stats** page to see weekly/monthly trends

### **Weekly Review (Sunday):**

9. Visit **Stats** page
10. Review weekly progress bar chart
11. Check monthly trend line chart
12. Review Top 10 Habits ranking
13. Identify habits that need improvement

### **Monthly Tasks:**

14. Export data (JSON or CSV) from **Settings** page
15. Review overall progress in **Stats** page
16. Adjust habits in **Habits** page if needed

---

## 💡 Tips & Best Practices

1. **Consistency is Key**: Track habits daily, preferably at the same time
2. **Start Small**: Begin with 3-5 habits, then add more gradually
3. **Use Categories**: Organize habits by category for better management
4. **Set Realistic Goals**: 30 days is a good starting point
5. **Review Weekly**: Check statistics every week to stay motivated
6. **Export Regularly**: Backup your data monthly
7. **Use Reminders**: Set reminder times for important habits
8. **Celebrate Progress**: Check your streak counter daily
9. **Focus on Top Habits**: Use ranking to see what's working
10. **Adjust as Needed**: Edit or delete habits that aren't working

---

## ❓ Frequently Asked Questions (FAQ)

**Q: Where is my data stored?**  
A: All data is stored in your browser's localStorage. It's saved locally on your device.

**Q: Can I use this on multiple devices?**  
A: Each device/browser has separate data. To sync, you'd need to export from one device and import to another (import feature can be added in future).

**Q: What happens if I clear my browser data?**  
A: All your habits and tracking data will be lost. Always export your data regularly as backup.

**Q: Can I change my password?**  
A: Yes, go to Settings page and use the "Change Password" section.

**Q: How do I delete my account?**  
A: Currently, you can clear browser data. A delete account feature can be added in future updates.

**Q: Can I track habits for more than 30 days?**  
A: Yes! You can set goal days from 1 to 365 days when creating/editing a habit.

**Q: What if I miss a day?**  
A: You can go back to previous months in the Track page and mark habits for past dates.

**Q: How is the streak calculated?**  
A: Streak counts consecutive days where you completed at least one habit.

**Q: Can I use this offline?**  
A: Yes! After the initial load, the app works offline. All data is stored locally.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Charts**: Chart.js with react-chartjs-2
- **Date Handling**: date-fns
- **Storage**: Browser localStorage
- **Styling**: CSS with CSS Variables for theming

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1400px max-width)
- Tablet (768px breakpoint)
- Mobile (optimized layouts)

## 🌙 Dark Mode

Toggle between light and dark themes from the Settings page. Your preference is saved and persists across sessions.

## 📊 Data Export

Export your habit tracking data in two formats:
- **JSON**: Complete data structure for backup/import
- **CSV**: Spreadsheet-friendly format for analysis

## 🚢 Deployment

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects: Create `public/_redirects` with:
   ```
   /*    /index.html   200
   ```

Or use Netlify's continuous deployment with GitHub.

## 📝 Notes

- All data is stored locally in the browser
- No backend server required
- Works offline (after initial load)
- Perfect for personal habit tracking

## 🎨 Color Scheme

- Primary Blue: `#4A90E2`
- Success Green: `#4CAF50`
- Danger Red: `#F44336`
- Light Gray: `#F2F4F7`

## 📄 License

This project is open source and available for personal use.

---

**Built with ❤️ for better habit tracking**

