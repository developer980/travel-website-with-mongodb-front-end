import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import "./form.css";
import Axios from "axios";
import bcrypt, { hash } from "bcryptjs"
import setToken from '../../redux/action/token';
import { Link } from 'react-router-dom';

const salt = bcrypt.genSaltSync(10, (err, salt) => {
  console.log("salt = " + salt)
})

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let token = ""

function generateToken() {
  for (let i = 0; i < 25; i++)
    token += characters[Math.floor(Math.random() * characters.length)]
  //setToken(token)
}

export default function Form() {
    const[username, setName] = useState('')
    const[email, setLocation] = useState('')
  const [password, setPrice] = useState('')
  const [status, setMessageStatus] = useState(0)
  const [message, displayMessage] = useState(0)

    console.log("Name = " + username)
    console.log("Location = " + email)
    console.log("Price = " + password)
  return (
    <Layout>
        <form className = "user-form" action="" onSubmit={() => {
         
      }}>
        <h1 className='title'>
          Create an account
        </h1>
            <span className='field-name'>Username</span>
            <input onChange = {(e) => setName(e.target.value)} id = "name" type="text" placeholder='Insert username'/>
            <span className='field-name'>Email</span>
            <input onChange = {(e) => setLocation(e.target.value)} type="email" placeholder='Insert email'/>
            <span className='field-name'>Password</span>
        <input onChange={(e) => setPrice(e.target.value)} type="password" placeholder='Insert password' />
        <div className = "user-form__submit-section">
            <button onClick={(e) => {
              e.preventDefault()
          generateToken()
            console.log("token: " + token)
            const hashedpassword = bcrypt.hashSync(password, salt, (err, hash) => {
              err && console.log(err)
              return hash
            })

            console.log("hashed password: " + hashedpassword)
               Axios.post("http://localhost:3001/post_user", {
                username:username,
                email:email,
                password: hashedpassword,
                token
               }).then(data => {
                 displayMessage(1)
                 console.log("Data:" + data.data)
                 if (data.data == "Email sent")
                  setMessageStatus(1)
                 else {
                  setMessageStatus(0)
                 }
               })
          token = ''
        }}>Sign up</button>
        
          <span>Already have an account?</span>
          <Link to="/log_in">Log in</Link>
          {
            
            message ? 
              status ?
                <div className="message">
                    <div>We sent a confirmation email to</div>
                    <div><b>{email}</b></div>
                </div>
                  :
                <div className="negative-message">
                      <div>The email is invalid</div>
                </div>
              :
              null
          }
        </div>  
      </form>
    </Layout>
  )
}
