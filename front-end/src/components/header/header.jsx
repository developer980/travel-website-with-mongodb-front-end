import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"

export default function Header() {
  return (
    <nav>
        <div>
            Logo
        </div>
        <section>
            <Link to = "/">Home</Link>
            <Link to = "/shop">Shop</Link>
            <Link to = "/sign_up">Sign up</Link>

            
        </section>
    </nav>
  )
}
