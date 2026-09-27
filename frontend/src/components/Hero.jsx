import React from 'react'
import { Link } from 'react-router-dom'
import { FaPython, FaReact, FaDatabase, FaCode } from 'react-icons/fa'

export default function Hero({ profile }) {
  const name = profile?.full_name || 'Steve Ongera'
  const [firstName] = name.split(' ')

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text">
          <h1>
            Welcome<span className="accent">!</span>
          </h1>
          <h2>to {firstName}'s Portfolio</h2>
          <p>
            {profile?.bio ||
              "Backend developer building scalable Django REST Framework APIs paired with fast React/Vite frontends for East African markets."}
          </p>
          <Link to="/about" className="btn btn-primary">
            Know About Me
          </Link>
        </div>

        <div className="hero-visual">
          <img
            src={profile?.avatar || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80'}
            alt={`${name} — Backend Developer`}
            width="380"
            height="460"
          />
          <div className="floating-chip chip-1"><FaPython /> Python</div>
          <div className="floating-chip chip-2"><FaCode /> Django</div>
          <div className="floating-chip chip-3"><FaReact /> React</div>
          <div className="floating-chip chip-4"><FaDatabase /> PostgreSQL</div>
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </div>
    </section>
  )
}
