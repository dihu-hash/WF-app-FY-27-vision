export const getOnboardingFlow = (userName) => [
  {
    id: 'welcome',
    aiMessages: [
      `Hi ${userName}! 👋 I'm here to help you get set up with Workforce.`,
      "This will only take a few minutes. I'll handle most of the heavy lifting for you!",
    ],
    userAction: {
      type: 'button',
      buttonText: "Let's get started",
      value: 'started',
    },
  },
  {
    id: 'personal_info',
    aiMessages: [
      "First, let me collect some basic information...",
      `I see your name is ${userName}. What's your phone number?`,
    ],
    userAction: {
      type: 'input',
      inputType: 'tel',
      placeholder: '(555) 123-4567',
      dataKey: 'phoneNumber',
      validation: (value) => value.replace(/\D/g, '').length === 10,
    },
  },
  {
    id: 'personal_info_complete',
    aiMessages: [
      "Great! I've saved your personal information.",
    ],
    userAction: {
      type: 'auto',
      delay: 1500,
    },
  },
  {
    id: 'bank_account',
    aiMessages: [
      "Now let's set up direct deposit for your paychecks...",
      "I'll need your bank account details. Which bank do you use?",
    ],
    userAction: {
      type: 'select',
      options: [
        'Chase',
        'Bank of America',
        'Wells Fargo',
        'Citibank',
        'US Bank',
        'Capital One',
        'TD Bank',
        'PNC Bank',
        'Other',
      ],
      dataKey: 'bankName',
    },
  },
  {
    id: 'bank_account_setup',
    aiMessages: [
      (data) => `Perfect! I'm securely connecting to ${data.bankName}...`,
      "✓ Bank account connected successfully!",
    ],
    userAction: {
      type: 'auto',
      delay: 2500,
    },
  },
  {
    id: 'tax_withholding',
    aiMessages: [
      "Next, let's handle your tax withholding...",
      "Are you filing as Single or Married?",
    ],
    userAction: {
      type: 'select',
      options: [
        'Single',
        'Married',
        'Head of Household',
      ],
      dataKey: 'filingStatus',
    },
  },
  {
    id: 'tax_complete',
    aiMessages: [
      "All set! I've configured your W-4 with standard withholdings.",
    ],
    userAction: {
      type: 'auto',
      delay: 1500,
    },
  },
  {
    id: 'documents',
    aiMessages: [
      "Almost done! Just need your signature on a few documents...",
    ],
    attachments: [
      { name: 'Employment Agreement.pdf', size: '2.4 MB' },
      { name: 'Direct Deposit Authorization.pdf', size: '1.1 MB' },
      { name: 'Tax Forms (W-4).pdf', size: '850 KB' },
    ],
    userAction: {
      type: 'button',
      buttonText: 'Review & Sign',
      value: 'signed',
    },
  },
  {
    id: 'document_signing',
    aiMessages: [
      "✓ Documents signed successfully!",
    ],
    userAction: {
      type: 'auto',
      delay: 1500,
    },
  },
  {
    id: 'complete',
    aiMessages: [
      "🎉 You're all set! Welcome to Workforce.",
      "Let me show you around your dashboard...",
    ],
    userAction: {
      type: 'button',
      buttonText: 'Enter Workforce',
      value: 'complete',
      celebration: true, // Flag to show confetti
    },
  },
];
