// ------------------------------------------------------------------
// Experience, from Grace's resume (August 2026).
// Shown on the Home page (latest 3 companies) and the Experience page.
// Newest first. A company can have several roles (promotions).
// ------------------------------------------------------------------

export interface Role {
  title: string
  start: string
  end: string
}

export interface Job {
  company: string
  about: string // one line on what the company does
  roles: Role[] // newest role first
  highlights: string[]
  recognition?: string[]
}

export const experience: Job[] = [
  {
    company: 'Stellarus',
    about: 'Healthcare technology and strategic solutions, spun off from Blue Shield of California in 2025.',
    roles: [
      { title: 'Manager, Data Visualization', start: 'Jun 2025', end: 'Present' },
      { title: 'Data Visualization & Democratization Expert', start: 'Jul 2023', end: 'May 2025' },
    ],
    highlights: [
      'Leading the migration of 2,933 Tableau workbooks and 1,033 data sources to the cloud, with governance and adoption support for 3,402 users.',
      'Manage and mentor a cross-functional team of analytics developers and platform administrators.',
      'Led the Enterprise Data Visualization Center of Excellence: roadmap, governance and standards for 290 developers.',
      'Standardized Tableau templates cut ~5 hours of build time per dashboard and lifted user adoption 25–30%.',
      'Designed executive dashboards for strategic planning across Sales, Marketing and Operations.',
      'Placed 2nd of 50 teams in the company hackathon with an agentic AI health-management prototype.',
    ],
    recognition: ['Mission & Values in Action Award (2023)'],
  },
  {
    company: 'BitTorrent',
    about: 'Consumer peer-to-peer software (Rainberry, Inc.).',
    roles: [
      { title: 'Head of Analytics', start: 'Dec 2021', end: 'Mar 2023' },
      { title: 'Analytics and Growth Manager', start: 'Mar 2020', end: 'Dec 2021' },
      { title: 'Sr. Analyst, Growth and Optimization', start: 'Mar 2018', end: 'Mar 2020' },
    ],
    highlights: [
      'Led analytics strategy across Marketing, Product, Sales, Ad Operations and Revenue.',
      'Experiment-driven conversion funnel work lifted installs 8% and premium adoption 3%.',
      'Analyzed $1.5M/month in revenue and ad-partner efficiency, shaping ad strategy.',
      'Built and maintained 35 executive and operational dashboards in Tableau, Looker and Google Analytics.',
      'Led a team of 2 analysts and 3 offshore resources.',
    ],
    recognition: ['Data Analytics Team Award (Q1 2022)', 'Individual Employee Recognition Award (Q2 2021)'],
  },
  {
    company: 'VerticalResponse',
    about: 'SaaS email marketing and automation, a Deluxe company.',
    roles: [{ title: 'Sr. Marketing Manager, Analytics and Optimization', start: 'Apr 2015', end: 'May 2017' }],
    highlights: [
      'Owned analytics strategy for paid search, lifecycle, content and email campaigns.',
      'Led A/B testing using behavioral data, heatmaps and session recordings.',
      'Defined tracking and implemented analytics across Google Analytics, Marketo, Salesforce and GTM.',
      'Targeted Marketo holiday campaign generated $25K in revenue.',
    ],
    recognition: ['VerticalResponse Star Award: fixed a lifecycle funnel issue, recovering paid conversions'],
  },
  {
    company: 'Check Point Software',
    about: 'Global provider of security solutions.',
    roles: [
      { title: 'Consumer Analyst', start: 'Dec 2010', end: 'Mar 2015' },
      { title: 'Contractor', start: 'Aug 2008', end: 'Dec 2010' },
    ],
    highlights: [
      'Insights on acquisition, retention and churn to inform product and marketing strategy.',
      'Built cohort-based lifetime value models to evaluate acquisition partners and pricing.',
      'Developed monetization models projecting freemium revenue from adoption and usage.',
      'Managed quarterly marketing budgets and sales forecasts.',
    ],
  },
]

export const education = [
  'B.S. Business Administration, California State University, East Bay — summa cum laude (top 2%)',
  'Certified Public Accountant (inactive)',
]

export const skills = [
  'SQL',
  'Tableau',
  'Looker',
  'Google Analytics',
  'Executive reporting',
  'A/B testing & experimentation',
  'Funnel & conversion analysis',
  'Cohort & LTV analysis',
  'Data governance',
  'Analytics Center of Excellence',
  'Team leadership',
  'Generative AI (Claude Code, Copilot)',
]
