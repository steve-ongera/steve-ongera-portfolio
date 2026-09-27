import React from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaUserEdit } from 'react-icons/fa'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function PostCard({ post }) {
  const tags = post.tag_list || []
  return (
    <article className="card">
      <div className="card-media">
        <div className="card-tags">
          {tags.slice(0, 2).map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <img src={post.cover_image} alt={post.title} loading="lazy" />
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span><FaUserEdit /> Steve Ongera</span>
          <span><FaCalendarAlt /> {formatDate(post.published_at)}</span>
        </div>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="btn btn-outline">
          Read More
        </Link>
      </div>
    </article>
  )
}
