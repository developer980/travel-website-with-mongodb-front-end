import React from 'react'
import Layout from '../../components/layout/layout'
import { Link } from 'react-router-dom'
import "./home.css"
import ls from "localstorage-slim"
import axios from "axios"
import { useState } from 'react'
import Mount_img from "../../images/Mountain_icon.png"

ls.config.encrypt = true


export default function Home() {
  console.log(ls.get("i"))

  
  const message = "Wake up!";
  axios.post("https://mydestinationapp.onrender.com/wake_up", {
    message:message
  }).then(data => {
    data && console.log(data)
  })

  return (
    <Layout mode = "home">
      <main>
        <section>
          <div className = "description">
            Go and travel anywere!
          </div>
          <div className = "links-section">
            {!ls.get('eml') ? <Link to = "/log_in">Sign in</Link> : null}
            <Link to="/booking_page">Book a place</Link>
          </div>
        </section>
        <div className='background-image'>
          <img className = "background-image-content" src={Mount_img} alt="Image" />
        </div>
      </main>
    </Layout>
  )
}
