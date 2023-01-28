import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import ls from "localstorage-slim"
import { useState } from 'react'
import Icon from "../../icons/Mountain_Icon.svg"

ls.config.encrypt = true

export default function Header() {
  const[display, displayOptions] = useState(0)
  return (
    <nav>
      <div className = "logo">
       <img src={Icon} className = "logo-content" alt="" />
      </div>
      <section>
        <Link to="/">Home</Link>
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
