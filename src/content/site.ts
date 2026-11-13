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

// Testimonials from former managers and colleagues. The section appears automatically once you add some.
// Each one looks like: { quote: '...', name: 'Full Name', role: 'Title, Company' }
export interface Testimonial {
  quote: string // short excerpt shown on the card
  full?: string[] // full recommendation, one string per paragraph ("Read more")
  name: string
  role: string
}
export const testimonials: Testimonial[] = [
  {
    quote:
      "Grace's superb attention to detail and analytical skills were invaluable for the entire consumer division. Grace is able to pull data from multiple sources and put together a cohesive story so that business owners can make the right decisions. She would be an asset to any company. I would work with her again in a heartbeat!",
    full: ["I was very fortunate to have worked with Grace at Check Point Software Technologies/ZoneAlarm. Grace's superb attention to detail and analytical skills were invaluable for the entire consumer division.", "Grace helped me monitor and forecast the retention part of the business, and she played a key role in benchmarking and measuring numerous optimization tests. She also created dashboards and performed analysis for various parts of the business including acquisition and retail.", "Anyone who has worked in online marketing and e-commerce understands how critical it is to have good metrics and analysis. Grace is able to pull data from multiple sources and put together a cohesive story so that business owners can make the right decisions.", "Although she juggled many projects for many people, Grace was always professional, on task, on time, and delivered high quality work. She would be an asset to any company. I would work with her again in a heartbeat!"],
    name: 'Jennifer Leonard',
    role: 'Product Marketing Leader · Managed Grace at Check Point / ZoneAlarm',
  },
  {
    quote:
      'Grace is a rockstar. She was a critical member of my marketing team at Vertical Response (an email marketing service provider). When we saw unexpected variances from our plan numbers, she would help team members across marketing, sales, finance, and product figure out what was going on. Best of all, Grace is smart but humble and is very positive and easy to work with. I strongly suggest you hire her if you can!',
    full: ["Grace is a rockstar. She was a critical member of my marketing team at Vertical Response (an email marketing service provider). We had a high velocity freemium business model with digital demand gen (mostly organic but with a healthy budget for paid on search and social as well). She fused together analytics from Google, social platforms, Salesforce, Marketo, and our product data warehouse into valuable reports we needed to drive the business. Some of the things she tracked creating standard reports and running ad hoc analysis:", "Content marketing - organic traffic analysis on blogs, promotion landing pages, and evergreen content (ebooks, webinars, etc.), conversion to trial, conversion to paid.", "Paid marketing - reach on search, remarketing through display, custom audience campaigns on social (remarketing and lookalikes).", "For these reports, Grace would pull data, synthesize it, analyze trends and identify anomalies. When we saw unexpected variances from our plan numbers, she would help team members across marketing, sales, finance, and product figure out what was going on. When we had new experiments to run, she helped measure the impact so we could make decisions about killing, continuing, or scaling each program.", "Best of all, Grace is smart but humble and is very positive and easy to work with. I strongly suggest you hire her if you can!"],
    name: 'David Williams',
    role: 'Chief Product Officer · Managed Grace at Vertical Response',
  },
  {
    quote:
      "Grace's Analytics team role is crucial to BitTorrent because the business is very dynamic, with new issues and opportunities all requiring deep and insightful (and quick) analysis and recommendations. As BitTorrent moved into the crypto world, Grace seamlessly developed an understanding of this new market and identified new analytical tools to apply. Through the Pandemic, Grace and her team performed without a hiccup.",
    full: ["It has been 8 years since my last recommendation for Grace, this time based on working with her for 5 years at BitTorrent. If anything, my respect for her has grown as Grace's skills have blossomed. I've admired Grace as she has taken on more responsibility, now heading up the BitTorrent Analytics team. Grace's Analytics team role is crucial to BitTorrent because the business is very dynamic, with new issues and opportunities all requiring deep and insightful (and quick) analysis and recommendations. As BitTorrent moved into the crypto world, Grace seamlessly developed an understanding of this new market and identified new analytical tools to apply. Through the Pandemic, Grace and her team performed without a hiccup. I hope I am fortunate to have the opportunity to work with Grace in the future."],
    name: 'Frank Bailinson',
    role: 'Director, Product Management, BitTorrent · Worked with Grace at BitTorrent',
  },
]
