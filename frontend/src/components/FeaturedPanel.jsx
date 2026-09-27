import React from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaUserEdit } from 'react-icons/fa'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function FeaturedPanel({ items = [] }) {
  if (!items.length) return null
  const [main, ...rest] = items

  return (
    <div className="featured-panel">
      <div className="featured-main">
        <div className="card-media">
          <div className="card-tags">
            <span className="tag solid">{main.category}</span>
          </div>
          <img src={main.image} alt={main.title} loading="lazy" />
        </div>
        <div className="card-meta">
          <span><FaUserEdit /> Steve Ongera</span>
          <span><FaCalendarAlt /> {formatDate(main.date_completed)}</span>
        </div>
        <h3>
          <Link to={`/projects/${main.slug}`}>{main.title}</Link>
        </h3>
        <p>{main.summary}</p>
        <Link to={`/projects/${main.slug}`} className="btn btn-outline">
          Read More
        </Link>
      </div>

      <div className="featured-list">
        {rest.slice(0, 4).map((item) => (
          <div className="featured-list-item" key={item.id}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <div>
              <h4>
                <Link to={`/projects/${item.slug}`}>{item.title}</Link>
              </h4>
              <span className="date"><FaCalendarAlt /> {formatDate(item.date_completed)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
