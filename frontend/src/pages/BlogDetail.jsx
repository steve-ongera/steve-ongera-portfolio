import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { getPostBySlug } from '../services/api.js'

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setPost(null)
    setNotFound(false)
    getPostBySlug(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
  }, [slug])

  if (notFound) {
    return (
      <div className="container">
        <p className="state-message">Article not found. <Link to="/blog">Back to blog</Link></p>
      </div>
    )
  }

  if (!post) {
    return <div className="container"><p className="state-message">Loading…</p></div>
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.meta_description || post.excerpt}
        image={post.cover_image}
        path={`/blog/${post.slug}`}
        type="article"
      />

      <div className="container" style={{ padding: '60px 0', maxWidth: 780 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {post.tag_list.map((t) => (
            <span className="tag solid" key={t} style={{ position: 'static' }}>{t}</span>
          ))}
        </div>
        <h1>{post.title}</h1>
        <p style={{ color: 'var(--clr-text-light)', fontSize: '0.85rem' }}>
          By Steve Ongera · {new Date(post.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
        <img src={post.cover_image} alt={post.title} style={{ borderRadius: 14, margin: '20px 0' }} />
        <p style={{ fontSize: '1.05rem', whiteSpace: 'pre-line' }}>{post.content}</p>
      </div>
    </>
  )
}
