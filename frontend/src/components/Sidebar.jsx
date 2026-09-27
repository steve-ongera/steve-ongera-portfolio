import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram, FaCalendarAlt } from 'react-icons/fa'
import { subscribeToNewsletter } from '../services/api.js'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function Sidebar({ profile, featuredProjects = [], recentPosts = [] }) {
  const [tab, setTab] = useState('featured')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const list = tab === 'featured' ? featuredProjects : recentPosts

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      await subscribeToNewsletter(email)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <aside>
      <div className="widget widget-about">
        <div className="logo">steve<span style={{ color: 'var(--clr-primary)' }}>.dev</span></div>
        <p>{profile?.bio || "Backend developer building Django REST Framework APIs and React/Vite frontends."}</p>
        <div className="socials">
          {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>}
          {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>}
          {profile?.twitter_url && <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>}
          {profile?.instagram_url && <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>}
        </div>
      </div>

      <div className="widget">
        <div className="section-heading">
          <h3>Featured</h3>
        </div>
        <div className="tab-toggle">
          <button className={tab === 'featured' ? 'active' : ''} onClick={() => setTab('featured')}>Projects</button>
          <button className={tab === 'recent' ? 'active' : ''} onClick={() => setTab('recent')}>Recent</button>
        </div>

        {list.slice(0, 3).map((item) => {
          const isProject = tab === 'featured'
          const to = isProject ? `/projects/${item.slug}` : `/blog/${item.slug}`
          const img = isProject ? item.image : item.cover_image
          const date = isProject ? item.date_completed : item.published_at
          return (
            <div className="sidebar-item" key={item.id}>
              <img src={img} alt={item.title} loading="lazy" />
              <div>
                <h4><Link to={to}>{item.title}</Link></h4>
                <span className="date"><FaCalendarAlt /> {formatDate(date)}</span>
              </div>
            </div>
          )
        })}
        {!list.length && <p style={{ fontSize: '0.85rem' }}>Content coming soon.</p>}
      </div>

      <div className="widget">
        <div className="section-heading">
          <h3>Newsletter</h3>
        </div>
        <p style={{ fontSize: '0.88rem' }}>
          Get notified when Steve publishes a new project or article.
        </p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Type and hit enter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
            Sign In
          </button>
          {status === 'success' && <p className="form-status success">Thanks — you're subscribed!</p>}
          {status === 'error' && <p className="form-status error">Something went wrong. Try again.</p>}
        </form>
        <p className="form-note">By signing up, you agree to the Privacy Policy</p>
      </div>
    </aside>
  )
}
