import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import { getProfile } from './services/api.js'

export default function App() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(null))
  }, [])

  return (
    <>
      <Navbar profile={profile} />
      <main>
        <Routes>
          <Route path="/" element={<Home profile={profile} />} />
          <Route path="/about" element={<About profile={profile} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact profile={profile} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer profile={profile} />
    </>
  )
}
