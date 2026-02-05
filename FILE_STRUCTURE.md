# Project File Structure

```
Mobile vision - opens in browser/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.js            # Vite build configuration
│   ├── tailwind.config.js        # TailwindCSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── .eslintrc.cjs             # ESLint rules
│   ├── .gitignore                # Git ignore rules
│   └── index.html                # HTML entry point
│
├── 📚 Documentation
│   ├── START_HERE.md             # ⭐ Start here first!
│   ├── QUICKSTART.md             # Quick overview
│   ├── SETUP.md                  # Detailed setup guide
│   ├── PROJECT_SUMMARY.md        # Technical documentation
│   ├── FILE_STRUCTURE.md         # This file
│   └── README.md                 # General project info
│
├── 📁 public/
│   └── vite.svg                  # Vite logo favicon
│
└── 📁 src/                       # Main source code
    │
    ├── main.jsx                  # React app entry point
    ├── App.jsx                   # Main app with routing
    ├── index.css                 # Global styles + Tailwind
    │
    ├── 📁 components/            # Reusable UI components
    │   │
    │   ├── 📁 Layout/            # Layout components (3)
    │   │   ├── PhoneMockup.jsx   # iPhone 17 frame wrapper
    │   │   ├── Header.jsx        # Page headers with actions
    │   │   └── BottomNav.jsx     # Bottom navigation bar
    │   │
    │   ├── 📁 Dashboard/         # Dashboard widgets (4)
    │   │   ├── WidgetCard.jsx    # Reusable widget wrapper
    │   │   ├── TasksWidget.jsx   # Upcoming tasks display
    │   │   ├── PaycheckWidget.jsx # Latest paycheck info
    │   │   └── ScheduleWidget.jsx # Today's schedule
    │   │
    │   ├── 📁 Time/              # Time tracking components (4)
    │   │   ├── Timer.jsx         # Timer display (HH:MM:SS)
    │   │   ├── TimerControls.jsx # Play/pause/stop buttons
    │   │   ├── JobDetails.jsx    # Job information card
    │   │   └── LocationMap.jsx   # Interactive map with markers
    │   │
    │   ├── 📁 Payroll/           # Payroll components (3)
    │   │   ├── RecentPaychecks.jsx # Paycheck list
    │   │   ├── PaycheckChart.jsx   # Donut chart breakdown
    │   │   └── UpsellCard.jsx      # Promotional card
    │   │
    │   ├── 📁 Schedule/          # Schedule components (1)
    │   │   └── CalendarView.jsx  # Interactive calendar
    │   │
    │   └── 📁 More/              # More menu components (1)
    │       └── MenuList.jsx      # Menu items with icons
    │
    ├── 📁 pages/                 # Page components (6)
    │   ├── Dashboard.jsx         # Home page with widgets
    │   ├── Time.jsx              # Time tracking page
    │   ├── Payroll.jsx           # Payroll information page
    │   ├── Schedule.jsx          # Schedule calendar page
    │   ├── More.jsx              # More menu page
    │   └── PlaceholderPage.jsx   # Reusable "Coming Soon" page
    │
    ├── 📁 data/                  # Mock data (1)
    │   └── mockData.js           # All fake data for the app
    │
    └── 📁 hooks/                 # Custom React hooks (1)
        └── useTimer.js           # Timer logic with persistence
```

## Component Count

- **Total Components:** 29
  - Layout: 3
  - Dashboard: 4
  - Time: 4
  - Payroll: 3
  - Schedule: 1
  - More: 1
  - Pages: 7
  - Hooks: 1
  - Data: 1
  - App files: 4

## File Dependencies

### Main Entry Flow
```
index.html
  └─> main.jsx
      └─> App.jsx
          ├─> PhoneMockup
          ├─> Router
          │   ├─> Dashboard
          │   ├─> Time
          │   ├─> Payroll
          │   ├─> Schedule
          │   ├─> More
          │   └─> PlaceholderPage (×7)
          └─> BottomNav
```

### Styling Flow
```
index.html
  └─> src/index.css
      ├─> @tailwind base
      ├─> @tailwind components
      ├─> @tailwind utilities
      └─> Custom CSS (animations, scrollbar, etc.)
```

### Data Flow
```
mockData.js
  ├─> Dashboard components
  ├─> Time components
  ├─> Payroll components
  ├─> Schedule components
  └─> More components
```

## Key Files to Know

### Essential Configuration
- **`package.json`** - All dependencies and npm scripts
- **`vite.config.js`** - Dev server runs on port 3000
- **`tailwind.config.js`** - Custom teal colors defined here

### Main App Files
- **`src/App.jsx`** - All routes defined here
- **`src/main.jsx`** - React app initialization
- **`src/index.css`** - Global styles and animations

### Data Source
- **`src/data/mockData.js`** - Single source of truth for all fake data

### Custom Logic
- **`src/hooks/useTimer.js`** - Timer functionality with localStorage

## Import Examples

```javascript
// Using layout components
import PhoneMockup from './components/Layout/PhoneMockup';
import Header from './components/Layout/Header';
import BottomNav from './components/Layout/BottomNav';

// Using dashboard widgets
import TasksWidget from './components/Dashboard/TasksWidget';
import PaycheckWidget from './components/Dashboard/PaycheckWidget';

// Using data
import { employee, currentJob, paychecks } from './data/mockData';

// Using custom hook
import { useTimer } from './hooks/useTimer';
```

## Build Output

When you run `npm run build`, Vite creates:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Bundled JavaScript
│   └── index-[hash].css     # Bundled CSS
└── vite.svg
```

## Notes

- All components use `.jsx` extension
- Configuration files use `.js` or `.cjs`
- No TypeScript (pure JavaScript)
- No test files (prototype only)
- No API integration files (mock data only)
