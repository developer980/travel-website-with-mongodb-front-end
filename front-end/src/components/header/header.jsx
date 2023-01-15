import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import ls from "localstorage-slim"

ls.config.encrypt = true

export default function Header() {
  return (
    <nav>
        <div>
            Hello <b>{ls.get("usr")}</b> 
        </div>
        <section>
            <Link to = "/">Home</Link>
            <Link to = "/shop">Shop</Link>
            <Link to = "/sign_up">Sign up</Link>            
        </section>
    </nav>
  )
}
