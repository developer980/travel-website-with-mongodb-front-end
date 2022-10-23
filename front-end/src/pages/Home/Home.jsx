import React from 'react'
import Layout from '../../components/layout/layout'
import { Link } from 'react-router-dom'
import "./home.css"

export default function Home() {
  return (
    <Layout>
      <main>
        <section>
          <div className = "description">
            Find new destinations or post your wonderfull place
          </div>
          <div className = "links-section">
            <Link to = "/form">Post a new destination</Link>
            <Link>Book a place</Link>
          </div>
        </section>
        <div>
          Images
        </div>
      </main>
    </Layout>
  )
}
