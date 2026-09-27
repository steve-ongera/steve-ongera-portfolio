import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import Hero from '../components/Hero.jsx'
import FeaturedPanel from '../components/FeaturedPanel.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import PostCard from '../components/PostCard.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { getFeaturedProjects, getProjects, getFeaturedPosts, getPosts } from '../services/api.js'

export default function Home({ profile }) {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [recentProjects, setRecentProjects] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])

  useEffect(() => {
    getFeaturedProjects().then((data) => setFeaturedProjects(data.results || data)).catch(() => {})
    getProjects().then((data) => setRecentProjects((data.results || data).slice(0, 4))).catch(() => {})
    getFeaturedPosts().then((data) => setFeaturedPosts(data.results || data)).catch(() => {})
  }, [])

  return (
    <>
      <SEO
        title={undefined}
        description={profile?.meta_description}
        image={profile?.avatar}
        path="/"
      />
      <Hero profile={profile} />

      <div className="container content-layout">
        <div>
          <div className="section-heading">
            <h2>Featured Projects</h2>
          </div>
          <FeaturedPanel items={featuredProjects} />

          <div className="section-heading" style={{ marginTop: 60 }}>
            <h2>Recent Projects</h2>
          </div>
          <div className="grid-2">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <Sidebar profile={profile} featuredProjects={featuredProjects} recentPosts={featuredPosts} />
      </div>
    </>
  )
}
