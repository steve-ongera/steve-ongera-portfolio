import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import PostCard from '../components/PostCard.jsx'
import { getPosts } from '../services/api.js'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPosts({ page })
      .then((data) => {
        const results = data.results || data
        setPosts(results)
        if (data.count) setTotalPages(Math.max(1, Math.ceil(data.count / 9)))
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <>
      <SEO
        title="Blog"
        description="Articles by Steve Ongera on Django REST Framework, React/Vite, and building web platforms for East African markets."
        path="/blog"
      />

      <section className="page-hero">
        <div className="container">
          <h1>Blog</h1>
          <p style={{ maxWidth: 640, margin: '0 auto' }}>
            Notes on Django REST Framework, React/Vite, and building for the Kenyan market.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 0' }}>
        {loading && <p className="state-message">Loading articles…</p>}
        {!loading && !posts.length && <p className="state-message">No articles published yet — check back soon.</p>}

        <div className="grid-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>&larr;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <span key={n} className={n === page ? 'active' : ''} onClick={() => setPage(n)}>{n}</span>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>&rarr;</button>
          </div>
        )}
      </div>
    </>
  )
}
