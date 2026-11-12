// ------------------------------------------------------------------
// Site-wide text. Edit these values to change what the site says.
// ------------------------------------------------------------------

export const site = {
  name: 'Grace Yuen',
  role: 'Analytics Leader',
  focus: 'Business Intelligence · Data Visualization · Product & Marketing Analytics',
  tagline: 'I turn complex data into decisions teams can act on.',
  intro:
    '15+ years in analytics across healthcare technology, SaaS, consumer software and cybersecurity — from hands-on growth and optimization work to leading enterprise analytics.',
  email: 'graceyuen00@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gracewyuen',
  // Your portrait (file lives in the `public` folder). To change it, replace public/grace.jpg or point this at another file.
  photo: '/grace.jpg',
}

export const about = [
  'I’ve built analytics teams, executive reporting and enterprise data visualization standards, and I partner with Product, Marketing, Sales, Revenue and Operations to turn data into decisions.',
  'My sweet spot is the gap between data and action: retention, funnel, experimentation and lifetime-value questions where a clear answer changes what a team does next.',
]

// Client testimonials. The section appears automatically once you add some.
// Each one looks like: { quote: '...', name: 'Full Name', role: 'Title, Company' }
export interface Testimonial {
  quote: string
  name: string
  role: string
}
export const testimonials: Testimonial[] = []
