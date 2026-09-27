import React from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaUserEdit } from 'react-icons/fa'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <div className="card-media">
        <div className="card-tags">
          <span className="tag solid">{project.category}</span>
        </div>
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span><FaUserEdit /> Steve Ongera</span>
          <span><FaCalendarAlt /> {formatDate(project.date_completed)}</span>
        </div>
        <h3>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <Link to={`/projects/${project.slug}`} className="btn btn-outline">
          Read More
        </Link>
      </div>
    </article>
  )
}
