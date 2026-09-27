import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import { getSkills, getExperience, getEducation } from '../services/api.js'

function formatYearMonth(dateStr) {
  if (!dateStr) return 'Present'
  return new Date(dateStr).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export default function About({ profile }) {
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])

  useEffect(() => {
    getSkills().then((data) => setSkills(data.results || data)).catch(() => {})
    getExperience().then((data) => setExperience(data.results || data)).catch(() => {})
    getEducation().then((data) => setEducation(data.results || data)).catch(() => {})
  }, [])

  return (
    <>
      <SEO
        title="About"
        description={`Learn more about ${profile?.full_name || 'Steve Ongera'}, a backend developer specializing in Django REST Framework and React/Vite.`}
        path="/about"
      />

      <section className="page-hero">
        <div className="container">
          <h1>About {profile?.full_name || 'Steve Ongera'}</h1>
          <p style={{ maxWidth: 640, margin: '0 auto' }}>
            {profile?.bio ||
              "Backend-focused full-stack developer building scalable Django REST Framework APIs paired with modern React/Vite frontends."}
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '70px 0' }}>
        <div className="section-heading">
          <h2>Skills &amp; Tools</h2>
        </div>
        <div className="grid-2">
          {skills.map((cat) => (
            <div className="skill-category" key={cat.id}>
              <h3>{cat.name}</h3>
              {cat.skills.map((skill) => (
                <div className="skill-bar" key={skill.id}>
                  <div className="label">
                    <span>{skill.name}</span>
                    <span>{skill.proficiency}%</span>
                  </div>
                  <div className="track">
                    <div className="fill" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="content-layout" style={{ paddingTop: 30 }}>
          <div>
            <div className="section-heading">
              <h2>Work Experience</h2>
            </div>
            <div className="timeline">
              {experience.map((exp) => (
                <div className="timeline-item" key={exp.id}>
                  <div className="period">
                    {formatYearMonth(exp.start_date)} — {exp.is_current ? 'Present' : formatYearMonth(exp.end_date)}
                  </div>
                  <h4>{exp.role}</h4>
                  <div className="org">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-heading">
              <h2>Education</h2>
            </div>
            <div className="timeline">
              {education.map((edu) => (
                <div className="timeline-item" key={edu.id}>
                  <div className="period">{edu.start_year} — {edu.end_year || 'Present'}</div>
                  <h4>{edu.qualification}</h4>
                  <div className="org">{edu.institution}</div>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
