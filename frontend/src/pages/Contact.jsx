import React, { useState } from 'react'
import SEO from '../components/SEO.jsx'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { submitContactForm } from '../services/api.js'

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitContactForm(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Contact"
        description={`Get in touch with ${profile?.full_name || 'Steve Ongera'} for Django REST Framework and React/Vite development work.`}
        path="/contact"
      />

      <section className="page-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p style={{ maxWidth: 640, margin: '0 auto' }}>
            Have a project in mind? Send a message and I'll get back to you.
          </p>
        </div>
      </section>

      <div className="container contact-grid">
        <div>
          <div className="section-heading">
            <h2>Contact Info</h2>
          </div>
          <div className="contact-info-item">
            <span className="icon"><FaEnvelope /></span>
            <div>
              <h4 style={{ margin: '0 0 4px' }}>Email</h4>
              <p style={{ margin: 0 }}>{profile?.email || 'steve.ongera@example.com'}</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="icon"><FaPhoneAlt /></span>
            <div>
              <h4 style={{ margin: '0 0 4px' }}>Phone</h4>
              <p style={{ margin: 0 }}>{profile?.phone || '+254 700 000000'}</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="icon"><FaMapMarkerAlt /></span>
            <div>
              <h4 style={{ margin: '0 0 4px' }}>Location</h4>
              <p style={{ margin: 0 }}>{profile?.location || 'Nairobi, Kenya'}</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
          <textarea name="message" placeholder="Your message" rows="6" value={form.message} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status === 'success' && <p className="form-status success">Message sent — thank you! I'll reply soon.</p>}
          {status === 'error' && <p className="form-status error">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </>
  )
}
