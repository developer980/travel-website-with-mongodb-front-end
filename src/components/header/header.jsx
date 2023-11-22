import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import ls from "localstorage-slim"
import { useState } from 'react'
import Icon from "../../icons/Mountain_Icon.svg"
import Axios from "axios"
import X from "../../icons/x.svg"
import Burger from "../../icons/burger.svg"

ls.config.encrypt = true

let offsetvalue = 0;

export default function Header(props) {
  const { mode } = props
  const [display, displayOptions] = useState(0)
  const [section, displaySection] = useState(0)

  console.log(section)

  window.addEventListener('scroll', () => {
    const offset = window.scrollY

    // console.log(offset)

    if (offset > 34) {
      document.getElementById("section").classList.add("section-wide")
      document.getElementById("section").classList.remove("section-narrow")
      document.getElementById("logo").classList.add("logo-insidenav")
      document.getElementById("logo").classList.remove("logo-outsidenav")
      document.getElementById("nav").classList.remove("nav-big")
      
      if (offset > offsetvalue) {
        document.getElementById("nav").classList.remove("nav-fixed")
        document.getElementById("nav").classList.add("nav-fixed-hidden")
        document.getElementById("logo-content").classList.add("logo-content-green")
        document.getElementById("logo-content").classList.remove("logo-content-white")
        offsetvalue = offset
      }
      else if(offset < offsetvalue){
        document.getElementById("nav").classList.remove("nav-fixed-hidden")
        document.getElementById("nav").classList.add("nav-fixed")
        document.getElementById("logo-content").classList.remove("logo-content-green")
        document.getElementById("logo-content").classList.add("logo-content-white")
        offsetvalue = offset
      }
      // if (offset > offsetvalue) 
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
      <Link to="/">
        <div id="logo" className="logo-outsidenav">
            <img id="logo-content" src={Icon} className="logo-content-green" alt="" />
        </div>
      </Link>
      <section id = "section" className='section-narrow'>
        {/* Home */}
        {
          mode != "home" && <Link style = {{fontWeight:mode == "book" && "bold"}} to="/booking_page">Book a place</Link>
        }
        {/* {ls.get('eml') && <Link style = {{fontWeight:mode == "favourites" && "bold"}} to = "/favourites">Favourites</Link>} */}
        <Link style = {{fontWeight:mode == "favourites" && "bold"}} to = "/favourites">Favourites</Link>          
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

      <section id="section__small" onClick={() => {
        !section && displaySection(1)
      }}>
        <div className="section__close-button">
          <img className='button-img' src={Burger} alt="" />
        </div>
        {section ? <div className="section__column">
          <div className="section__close-button" onClick={() => {
            console.log("pressed")
            displaySection(0)
          }}><img className='button-img' src={X} /></div>
          {/* Home */}
          {
            mode != "home" && <Link style={{ fontWeight: mode == "book" && "bold" }} to="/booking_page">Book a place</Link>
          }
          {/* {ls.get('eml') && <Link style = {{fontWeight:mode == "favourites" && "bold"}} to = "/favourites">Favourites</Link>} */}
          <Link style={{ fontWeight: mode == "favourites" && "bold" }} to="/favourites">Favourites</Link>
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
              <Link to="/log_in">Log in</Link>
          }
        </div>: null}
      </section>
      
      {
            display ?
              <div className="nav-user-settings">
            <Link onClick={() => {
              ls.remove("eml");
              ls.remove("usr")
              ls.remove("pasd")
              window.location.reload()
            }}>Log out</Link>
            
            <Link onClick={() => {
              Axios.post("https://mydestinationapp.onrender.com/delete_user", {
                email:ls.get("eml")
              }).then(() => {
                ls.remove("eml");
                ls.remove("usr")
                ls.remove("pasd")
                window.location.reload()
              })
            }}>Delete account</Link>
              </div> :
              null
          }
    </nav>
  )
}
