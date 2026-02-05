# Quick Start Guide

## Get Started in 3 Steps

### Step 1: Install Node.js (if not already installed)
Download from [nodejs.org](https://nodejs.org/) - Choose the LTS version

### Step 2: Install Dependencies
Open Terminal and run:
```bash
cd "/Users/dhu01/Desktop/Mobile vision - opens in browser"
npm install
```

### Step 3: Launch the App
```bash
npm run dev
```

The app will open automatically in your browser!

## What You'll See

The app displays in an **iPhone 17 mockup** with 5 main pages accessible via bottom navigation:

### 🏠 Dashboard (Home)
- Hours this week with progress bar
- Upcoming tasks
- Latest paycheck amount
- Today's schedule
- Quick "Clock In" button

### ⏱️ Time Tracking
- **Working timer** - Click play to start tracking time
- Background turns teal when active
- Coffee break button
- Swipeable panels (dots at top):
  - Panel 1: Job details (customer, service, location, rate)
  - Panel 2: Map showing your location and work location
  - Panel 3: Extended details (manager, notes)
- Timer persists even when you navigate away!

### 💰 Payroll
- Recent paychecks list
- Upsell card for advance pay
- Interactive donut chart showing:
  - Net pay (teal)
  - Federal taxes (pink)
  - State taxes (orange)
  - Other (blue)
- Action buttons for paystubs, taxes, wallet

### 📅 Schedule
- Calendar view with month navigation
- Click dates to see scheduled jobs
- Dates with jobs show a dot indicator
- Job cards with full details (time, customer, location, manager)

### ⋯ More
- Benefits, Performance, Team, Workflows
- Settings, Help & Support, Logout
- Each opens a placeholder "Coming Soon" page

## Key Features

✅ **Fully Functional Timer** - Starts, stops, persists across navigation
✅ **Interactive Map** - Shows current location and work site
✅ **Swipeable Panels** - Horizontal scrolling with dot indicators
✅ **Calendar View** - Click dates to view scheduled jobs
✅ **Responsive Charts** - Donut chart for paycheck breakdown
✅ **iPhone Mockup** - Realistic phone frame with notch and status bar
✅ **All Fake Data** - No backend needed, works completely offline (except map tiles)

## Tips

- **Timer**: Click play to start, stop to reset
- **Navigation**: Bottom bar always visible, active page highlighted in teal
- **Calendar**: Use arrows to change months, "Today" to jump to current date
- **Panels**: Look for dots to know you can swipe left/right

## Need Help?

See `SETUP.md` for detailed documentation and troubleshooting.

---

**Built with:** React, Vite, TailwindCSS, React Router, Recharts, React Leaflet
