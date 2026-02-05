// Employee Information
export const employee = {
  name: "Sarah Johnson",
  avatar: "https://i.pravatar.cc/150?img=47",
  id: "EMP001",
  email: "sarah.johnson@email.com",
  phone: "(555) 123-4567",
  address: "123 Main Street, New York, NY 10001",
  role: "Service Technician",
  department: "Field Operations"
};

// Current Job Information
export const currentJob = {
  startTime: "Today, 9:45 AM",
  customer: "Evergreen Apartments",
  serviceItem: "Roofing",
  location: "Building 5",
  billable: true,
  billableRate: 25,
  status: "Investigating",
  manager: "Alan Wlaker",
  notes: "",
  coordinates: { lat: 40.7589, lng: -73.9851 },
  workCoordinates: { lat: 40.7610, lng: -73.9840 },
  // Additional timesheet fields
  jobNumber: "JOB-2024-1547",
  department: "Field Operations",
  estimatedHours: "6-8 hours",
  priority: "High",
  equipment: "Safety harness, tools",
  travelTime: "25 min",
  mileage: "15 miles",
  crewSize: "2 technicians",
  weatherConditions: "Sunny, 72°F",
  materialsUsed: "$150.00",
  completionRate: "65%",
  nextVisit: "Feb 5, 2026",
  overtimeApproved: "Yes",
  hazardPay: "Yes",
  customerContact: "(555) 123-4567"
};

// Paychecks Data
export const paychecks = [
  { 
    id: 1,
    date: "Fri, Apr 30", 
    amount: 1348.29,
    breakdown: {
      netPay: 1348.29,
      federalTaxes: 285.50,
      stateTaxes: 125.75,
      other: 40.46,
      gross: 1800.00
    }
  },
  { 
    id: 2,
    date: "Fri, Apr 15", 
    amount: 1748.97,
    breakdown: {
      netPay: 1748.97,
      federalTaxes: 370.25,
      stateTaxes: 163.50,
      other: 52.28,
      gross: 2335.00
    }
  },
  { 
    id: 3,
    date: "Fri, Apr 1", 
    amount: 1580.45,
    breakdown: {
      netPay: 1580.45,
      federalTaxes: 335.80,
      stateTaxes: 148.25,
      other: 47.50,
      gross: 2112.00
    }
  }
];

// Year to date paycheck breakdown
export const yearToDateBreakdown = {
  netPay: 18500.50,
  federalTaxes: 3950.25,
  stateTaxes: 1745.30,
  other: 562.95,
  total: 24759.00
};

// Tasks Data
export const tasks = [
  { 
    id: 1, 
    title: "Complete safety training", 
    status: "pending", 
    dueDate: "Today",
    priority: "high"
  },
  { 
    id: 2, 
    title: "Submit timesheet for last week", 
    status: "pending", 
    dueDate: "Tomorrow",
    priority: "high"
  },
  { 
    id: 3, 
    title: "Review updated protocols", 
    status: "in_progress", 
    dueDate: "Jan 31",
    priority: "medium"
  },
  { 
    id: 4, 
    title: "Equipment inspection", 
    status: "pending", 
    dueDate: "Feb 2",
    priority: "low"
  }
];

// Schedule Data
export const schedule = [
  {
    date: "2026-01-30",
    customer: "Evergreen Apartments",
    service: "Roofing",
    time: "9:00 AM",
    status: "In progress",
    customerInfo: {
      contact: "David Thompson",
      phone: "(555) 111-2222",
      address: "1500 Evergreen Lane, Building 3"
    },
    jobDetails: {
      duration: "8 hours",
      priority: "High",
      equipment: "Shingles, nails, safety harness",
      notes: "Roof leak repair and inspection"
    },
    pendingActions: [
      "Complete shingle replacement",
      "Inspect surrounding areas",
      "Collect outstanding payment"
    ]
  },
  {
    date: "2026-01-31",
    customer: "Sunrise Complex",
    service: "HVAC Maintenance",
    time: "8:00 AM",
    status: "Scheduled",
    customerInfo: {
      contact: "Lisa Anderson",
      phone: "(555) 222-3333",
      address: "800 Sunrise Boulevard"
    },
    jobDetails: {
      duration: "3 hours",
      priority: "Medium",
      equipment: "HVAC tools, filters",
      notes: "Quarterly maintenance check"
    },
    pendingActions: [
      "Replace air filters",
      "Test thermostat calibration",
      "Document inspection findings"
    ]
  },
  {
    date: "2026-02-01",
    customer: "Downtown Office Park",
    service: "Electrical Repairs",
    time: "10:00 AM",
    status: "Completed",
    customerInfo: {
      contact: "Michael Brown",
      phone: "(555) 345-6789",
      address: "789 Main Street, Floor 3"
    },
    jobDetails: {
      duration: "2 hours",
      priority: "Medium",
      equipment: "Multimeter, wire cutters",
      notes: "Breaker panel upgrade"
    },
    pendingActions: [
      "Collect payment",
      "Get customer signature"
    ]
  },
  {
    date: "2026-02-02",
    customer: "Harbor View",
    service: "Painting",
    time: "1:00 PM",
    status: "In progress",
    customerInfo: {
      contact: "Robert Wilson",
      phone: "(555) 567-8901",
      address: "350 Harbor Boulevard"
    },
    jobDetails: {
      duration: "6 hours",
      priority: "High",
      equipment: "Sprayer, brushes, drop cloths",
      notes: "Exterior building painting"
    },
    pendingActions: [
      "Apply second coat",
      "Clean up work area",
      "Final inspection with manager"
    ]
  },
  {
    date: "2026-02-03",
    customer: "Riverside Mall",
    service: "Plumbing",
    time: "7:00 AM",
    status: "Scheduled",
    customerInfo: {
      contact: "John Martinez",
      phone: "(555) 123-4567",
      address: "1234 River Street, Suite 100"
    },
    jobDetails: {
      duration: "3 hours",
      priority: "High",
      equipment: "Pipe wrench, snake tool",
      notes: "Main water line repair needed"
    },
    pendingActions: [
      "Complete pipe replacement",
      "Test water pressure",
      "Submit completion report"
    ]
  },
  {
    date: "2026-02-04",
    customer: "Westside Plaza",
    service: "Carpentry",
    time: "11:00 AM",
    status: "Scheduled",
    customerInfo: {
      contact: "Emily Davis",
      phone: "(555) 456-7890",
      address: "2000 West Avenue, Unit 5"
    },
    jobDetails: {
      duration: "4 hours",
      priority: "Medium",
      equipment: "Power saw, drill",
      notes: "Door frame repairs"
    },
    pendingActions: [
      "Pick up materials",
      "Confirm access time"
    ]
  },
  {
    date: "2026-02-05",
    customer: "Tech Campus",
    service: "Security Systems",
    time: "9:00 AM",
    status: "Scheduled",
    customerInfo: {
      contact: "Sarah Chen",
      phone: "(555) 234-5678",
      address: "500 Tech Drive, Building B"
    },
    jobDetails: {
      duration: "3 hours",
      priority: "High",
      equipment: "Access control panel, cables",
      notes: "Access control system upgrade"
    },
    pendingActions: [
      "Review system requirements",
      "Test backup power",
      "Train facility staff"
    ]
  }
];

// Weekly Hours Summary
export const weeklyHours = {
  current: 32.5,
  target: 40,
  overtime: 0,
  days: [
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 8.5 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 8 },
    { day: "Fri", hours: 0 }
  ]
};

// More Menu Items
export const moreMenuItems = {
  workInfo: [
    { id: 'benefits', label: 'Benefits', icon: 'Heart', path: '/benefits' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp', path: '/performance' },
    { id: 'team', label: 'Team', icon: 'Users', path: '/team' },
    { id: 'workflows', label: 'Workflows', icon: 'GitBranch', path: '/workflows' }
  ],
  account: [
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    { id: 'help', label: 'Help & Support', icon: 'HelpCircle', path: '/help' },
    { id: 'logout', label: 'Log out', icon: 'LogOut', path: '/logout' }
  ]
};

// Benefits Data
export const benefitsEnrollment = {
  totalCost: 285.50,
  employerContribution: 185.50,
  employeeCost: 100.00,
  plans: [
    { name: 'Health insurance', cost: 75.00, employerPays: 50.00 },
    { name: 'Dental insurance', cost: 15.00, employerPays: 10.00 },
    { name: 'Vision insurance', cost: 10.00, employerPays: 5.00 }
  ]
};

// AI Insights & Notifications
export const aiInsights = [
  {
    id: 1,
    type: 'reminder',
    priority: 'high',
    title: 'Timesheet due tomorrow',
    message: 'Don\'t forget to submit your timesheet for last week by end of day tomorrow.',
    time: '2 hours ago',
    icon: 'clock'
  },
  {
    id: 2,
    type: 'achievement',
    priority: 'medium',
    title: 'Great performance this week',
    message: 'You\'ve completed 12 tasks and logged 32.5 hours. Keep up the excellent work!',
    time: '4 hours ago',
    icon: 'star'
  },
  {
    id: 3,
    type: 'alert',
    priority: 'high',
    title: 'Payment collection pending',
    message: 'Collect outstanding payment from Evergreen Apartments for completed roofing work.',
    time: 'Today',
    icon: 'alert'
  }
];

export const benefitsMarketplace = [
  {
    id: 1,
    name: 'Premium health plan',
    category: 'Health insurance',
    monthlyCost: 125.00,
    employerContribution: 75.00,
    coverage: 'Full medical, prescription, and preventive care',
    status: 'available'
  },
  {
    id: 2,
    name: 'Life insurance',
    category: 'Life & disability',
    monthlyCost: 25.00,
    employerContribution: 15.00,
    coverage: 'Up to $100,000 coverage',
    status: 'available'
  },
  {
    id: 3,
    name: '401(k) retirement',
    category: 'Retirement',
    monthlyCost: 0,
    employerContribution: 'Up to 5% match',
    coverage: 'Tax-advantaged retirement savings',
    status: 'enrolled'
  },
  {
    id: 4,
    name: 'FSA account',
    category: 'Health savings',
    monthlyCost: 50.00,
    employerContribution: 0,
    coverage: 'Pre-tax healthcare spending',
    status: 'available'
  }
];

export const benefitsHistory = [
  {
    id: 1,
    date: 'Jan 1, 2026',
    action: 'Enrolled',
    benefit: 'Health insurance - Premium plan',
    cost: 75.00
  },
  {
    id: 2,
    date: 'Jan 1, 2026',
    action: 'Enrolled',
    benefit: 'Dental insurance',
    cost: 15.00
  },
  {
    id: 3,
    date: 'Jan 1, 2026',
    action: 'Enrolled',
    benefit: 'Vision insurance',
    cost: 10.00
  },
  {
    id: 4,
    date: 'Dec 15, 2025',
    action: 'Updated',
    benefit: '401(k) contribution - Increased to 8%',
    cost: 0
  }
];
