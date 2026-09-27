import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { getProjectBySlug } from '../services/api.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setProject(null)
    setNotFound(false)
    getProjectBySlug(slug)
      .then(setProject)
      .catch(() => setNotFound(true))
  }, [slug])

  if (notFound) {
    return (
      <div className="container">
        <p className="state-message">Project not found. <Link to="/projects">Back to projects</Link></p>
      </div>
    )
  }

  if (!project) {
    return <div className="container"><p className="state-message">Loading…</p></div>
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.meta_description || project.summary}
        image={project.image}
        path={`/projects/${project.slug}`}
        type="article"
      />

      <div className="container" style={{ padding: '60px 0', maxWidth: 860 }}>
        <div className="card-tags" style={{ position: 'static', marginBottom: 16 }}>
          <span className="tag solid">{project.category}</span>
        </div>
        <h1>{project.title}</h1>
        <img src={project.image} alt={project.title} style={{ borderRadius: 14, marginBottom: 26 }} />
        <p style={{ fontSize: '1.05rem' }}>{project.description}</p>

        <h3>Tech Stack</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 26 }}>
          {project.tech_list.map((t) => (
            <span className="tag solid" key={t} style={{ position: 'static' }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View Live
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View Code
            </a>
          )}
        </div>
      </div>
    </>
  )
}
