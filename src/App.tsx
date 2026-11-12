import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import DashboardPage from './pages/DashboardPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Portfolio from './pages/Portfolio'

// The site map: each <Route> is one URL → one page.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<DashboardPage />} />
        <Route path="contact" element={<Contact />} />
        {/* Old addresses keep working */}
        <Route path="dashboards" element={<Navigate to="/portfolio" replace />} />
        <Route path="dashboards/:slug" element={<Navigate to="/portfolio" replace />} />
        <Route path="experience" element={<Navigate to="/about#experience" replace />} />
        <Route path="services" element={<Navigate to="/#services" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
