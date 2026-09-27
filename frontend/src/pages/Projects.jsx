import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { getProjects } from '../services/api.js'

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'django', label: 'Django' },
  { value: 'react', label: 'React' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'api', label: 'API' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthcare', label: 'Healthcare' },
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = { page }
    if (category) params.category = category
    getProjects(params)
      .then((data) => setProjects(data.results || data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [category, page])

  return (
    <>
      <SEO
        title="Projects"
        description="Explore Steve Ongera's Django REST Framework and React/Vite projects across healthcare, fintech, education and hospitality."
        path="/projects"
      />

      <section className="page-hero">
        <div className="container">
          <h1>Projects</h1>
          <p style={{ maxWidth: 640, margin: '0 auto' }}>
            A selection of full-stack systems built with Django REST Framework and React/Vite.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 0' }}>
        <div className="category-filter">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              className={category === c.value ? 'active' : ''}
              onClick={() => { setCategory(c.value); setPage(1) }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading && <p className="state-message">Loading projects…</p>}
        {!loading && !projects.length && <p className="state-message">No projects found in this category yet.</p>}

        <div className="grid-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  )
}
