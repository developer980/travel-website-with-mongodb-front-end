import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import ls from "localstorage-slim"
import { useState } from 'react'
import Icon from "../../icons/Mountain_Icon.svg"

ls.config.encrypt = true

export default function Header() {
  const [display, displayOptions] = useState(0)
  window.addEventListener('scroll', () => {
    const offset = window.scrollY

    console.log(offset)

    if (offset > 34) {
      document.getElementById("section").classList.add("section-wide")
      document.getElementById("section").classList.remove("section-narrow")
      document.getElementById("nav").classList.remove("nav-big")
      document.getElementById("nav").classList.add("nav-fixed")
      document.getElementById("logo").classList.add("logo-insidenav")
      document.getElementById("logo").classList.remove("logo-outsidenav")
      document.getElementById("logo-content").classList.add("logo-content-white")
      document.getElementById("logo-content").classList.remove("logo-content-green")
    }
    else {
      document.getElementById("section").classList.remove("section-wide")
      document.getElementById("section").classList.add("section-narrow")
      document.getElementById("nav").classList.add("nav-big")
      document.getElementById("nav").classList.remove("nav-fixed")
      document.getElementById("logo").classList.remove("logo-insidenav")
      document.getElementById("logo").classList.add("logo-outsidenav")
      document.getElementById("logo-content").classList.remove("logo-content-white")
      document.getElementById("logo-content").classList.add("logo-content-green")
    }
  })
  return (
    <nav id = "nav" className = "nav-big">
      <div id = "logo" className = "logo-outsidenav">
       <img id = "logo-content" src={Icon} className = "logo-content-green" alt="" />
      </div>
      <section id = "section" className='section-narrow'>
        <Link to="/">Home</Link>
        
        <Link to="/booking_page">Book a place</Link>
        {ls.get('eml') && <Link to = "/favourites">Favourites</Link>}
                 
        {
          ls.get("eml") ?
          <div className="nav-user" onClick={() => { 
            if (display) {
              displayOptions(0)
              return
            }
            displayOptions(1)
          }}>
              Hello <b>{ls.get("usr")}</b>
            </div> :
            <Link to = "/log_in">Log in</Link>     
        }
      </section>
      
      {
            display ?
              <div className="nav-user-settings">
                <Link>Account</Link>
            <Link onClick={() => {
              ls.remove("eml");
              ls.remove("usr")
              ls.remove("pasd")
              window.location.reload()
                }}>Log out</Link>
              </div> :
              null
          }
    </nav>
  )
}
