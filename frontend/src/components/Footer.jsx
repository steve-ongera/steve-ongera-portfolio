import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="logo">steve<span>.dev</span></div>
        <p>
          {profile?.bio ||
            "Backend developer building Django REST Framework APIs and React/Vite frontends for East African markets."}
        </p>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/blog">Blog</Link>
        </div>

        <div className="footer-socials">
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          )}
          {profile?.twitter_url && (
            <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
          )}
          {profile?.instagram_url && (
            <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          )}
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} {profile?.full_name || 'Steve Ongera'}. Designed &amp; developed with Django + React.
        </div>
      </div>
    </footer>
  )
}
