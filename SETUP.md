# Workforce App - Setup Instructions

## Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

To check if you have Node.js installed:
```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

## Installation Steps

### 1. Navigate to the project directory
```bash
cd "/Users/dhu01/Desktop/Mobile vision - opens in browser"
```

### 2. Install dependencies
```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router DOM
- TailwindCSS
- Lucide React (icons)
- Recharts (charts)
- React Leaflet & Leaflet (maps)
- Swiper (swiping functionality)
- Vite (build tool)

### 3. Start the development server
```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── PhoneMockup.jsx       # iPhone 17 frame
│   │   ├── Header.jsx            # Page headers
│   │   └── BottomNav.jsx         # Bottom navigation
│   ├── Dashboard/
│   │   ├── WidgetCard.jsx
│   │   ├── TasksWidget.jsx
│   │   ├── PaycheckWidget.jsx
│   │   └── ScheduleWidget.jsx
│   ├── Time/
│   │   ├── Timer.jsx             # Timer display
│   │   ├── TimerControls.jsx    # Play/pause buttons
│   │   ├── JobDetails.jsx       # Job info card
│   │   └── LocationMap.jsx      # Map component
│   ├── Payroll/
│   │   ├── RecentPaychecks.jsx
│   │   ├── PaycheckChart.jsx
│   │   └── UpsellCard.jsx
│   ├── Schedule/
│   │   └── CalendarView.jsx
│   └── More/
│       └── MenuList.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Time.jsx
│   ├── Payroll.jsx
│   ├── Schedule.jsx
│   ├── More.jsx
│   └── PlaceholderPage.jsx
├── data/
│   └── mockData.js              # All fake data
├── hooks/
│   └── useTimer.js              # Timer logic
├── App.jsx                       # Main app with routing
├── main.jsx                      # Entry point
└── index.css                     # Global styles
```

## Features

### 1. Dashboard Page
- Quick action buttons
- Hours this week widget with progress bar
- Upcoming tasks
- Latest paycheck info
- Today's schedule
- Performance upsell card

### 2. Time Tracking Page
- **Functional timer** that counts up (HH:MM:SS)
- Play/Pause/Stop controls
- Coffee break button
- Timer state persists across page navigation
- Swipeable panels showing:
  - Job details
  - Location map with markers
  - Extended job info with manager and notes
- Background changes to teal when timer is running

### 3. Payroll Page
- Recent paychecks list
- Upsell card for Clair On-Demand Pay
- Interactive donut chart showing paycheck breakdown:
  - Net pay
  - Federal taxes
  - State taxes
  - Other deductions
- Action buttons for paystubs, taxes, and wallet

### 4. Schedule Page
- Interactive calendar view
- Month navigation
- "Today" quick jump button
- Colored dots indicating scheduled jobs
- Click dates to view job details below calendar
- Job cards showing time, customer, service, location, and manager

### 5. More Page
- Organized menu sections:
  - Work Information (Benefits, Performance, Team, Workflows)
  - Account (Settings, Help & Support, Logout)
- Each item navigates to placeholder pages

## Design Features

- **iPhone 17 mockup** - App displays in realistic phone frame
- **Hybrid theme** - Dark hero sections with light content areas
- **Mobile-first responsive design** - Optimized for 393px width
- **Smooth animations** - Fade-in transitions and hover states
- **Interactive map** - OpenStreetMap integration with custom markers
- **Persistent timer** - Timer state saved to localStorage

## Usage Tips

### Timer Functionality
1. Click the **Play** button to start the timer
2. The background changes to teal when active
3. Use the **Coffee** button to pause for breaks
4. Click **Stop** to reset the timer
5. Timer continues running even when navigating to other pages

### Navigation
- Use the bottom navigation bar to switch between pages
- Active page is highlighted in teal with an indicator line
- Back buttons available on placeholder pages

### Calendar
- Click dates to view scheduled jobs
- Use arrow buttons to navigate months
- Click "Today" to jump to current date
- Dates with jobs show a small dot indicator

## Troubleshooting

### Port already in use
If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.)

### Map not loading
Make sure you have internet connection as the map tiles are loaded from OpenStreetMap servers.

### Timer not persisting
Check your browser's localStorage settings. Some browsers in private mode may not persist data.

## Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Browser Compatibility

The app works best in modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Notes

- All data is fake/mocked - no backend required
- Timer state is stored in browser localStorage
- Map requires internet connection
- Designed for mobile viewport (393px wide)
- Best viewed on desktop browsers with the phone mockup centered
