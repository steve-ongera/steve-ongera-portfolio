import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaGithub, FaLinkedinIn, FaTwitter, FaSearch, FaMoon, FaBars, FaTimes } from 'react-icons/fa'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ profile }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <NavLink to="/" className="logo">
          steve<span>.dev</span>
        </NavLink>

        <nav className="nav-links" style={open ? { display: 'flex', position: 'absolute', top: 70, left: 0, right: 0, background: '#fff', flexDirection: 'column', padding: 20, borderBottom: '1px solid #ebedf0' } : {}}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {profile?.github_url && (
            <a className="icon-btn" href={profile.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          )}
          {profile?.linkedin_url && (
            <a className="icon-btn" href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          )}
          {profile?.twitter_url && (
            <a className="icon-btn" href={profile.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          )}
          <span className="icon-btn" aria-hidden="true"><FaMoon /></span>
          <NavLink className="icon-btn search" to="/contact" aria-label="Contact">
            <FaSearch />
          </NavLink>
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  )
}
