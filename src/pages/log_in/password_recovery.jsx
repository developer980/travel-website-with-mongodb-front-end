import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import axios from 'axios'
import { getEmail } from '../../redux/reducer/date'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ls from "localstorage-slim"

// import bcrypt from "bcryptjs"

// const salt = bcrypt.genSaltSync(10)

let token = ""

// function generateToken() {
//   for (let i = 0; i < 25; i++)
//     token += characters[Math.floor(Math.random() * characters.length)]
//   //setToken(token)
// }

export default function Password_recovery() {
  const [email, setEmail] = useState('')
  const [message, displayMessage] = useState(0)
  // const dispatch = useDispatch()
  
  return (
    <Layout>
        <form className="user-form" action="">
          <span className='field-name'>Insert your email address</span>
          <input onChange = {(e) => setEmail(e.target.value)} id = "name" type="text" placeholder='Insert email'/>
          
        <button onClick={(e) => {
          e.preventDefault()
          //dispatch(getEmail(email))
          ls.set("dest_eml", email)
          // displayMessage(1)
          axios.post("https://mydestinationapp.onrender.com/reset_email", {
            email
          }).then(data => {
            console.log("data" + data.data)
            if (data.data) {
              displayMessage(1)
            }
          })
          }}>
            Send recovery email
        </button>
        <div className = "message-section">
        {
          message ?
            <div className="message">
              <span>
                An email with a password recovery link has been sent to <b>{email}</b>
              </span>
            </div>
          :
          null
        }
        {/* <div className="message">An email with a password recovery link has been sent to <b>{email}</b></div> */}
        {/* <Link to="/resetPasswordfor:token">
          test
        </Link> */}
          </div>
        </form>
    </Layout>
  )
}
