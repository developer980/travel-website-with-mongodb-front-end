import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import "./form.css";
import Axios from "axios";
import bcrypt, { hash } from "bcryptjs"
import { Link } from 'react-router-dom';
import { getEmail } from '../../redux/reducer/date';
import { useDispatch } from 'react-redux';
import ls from "localstorage-slim"

const salt = bcrypt.genSaltSync(10, (err, salt) => {
  console.log("salt = " + salt)
})

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let token = ""

ls.config.encrypt = true


function generateToken() {
  for (let i = 0; i < 25; i++)
    token += characters[Math.floor(Math.random() * characters.length)]
  //setToken(token)
}

export default function Form() {
  
  const [username, setName] = useState('')
  const [email, setLocation] = useState('')

  const dispatch = useDispatch()
  const [password, setPrice] = useState('')
  const [status, setMessageStatus] = useState(0)
  const [message, displayMessage] = useState(0)

  const [warning, showWarning] = useState(0);

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
            ls.set("check_eml", email)
            e.preventDefault()
            generateToken()
            console.log("token: " + token)
            const hashedpassword = bcrypt.hashSync(password, salt, (err, hash) => {
              err && console.log(err)
              return hash
            })
            dispatch(getEmail(email))
            console.log("hashed password: " + hashedpassword)
            username && email && password ?
               Axios.post("https://mydestinationapp.onrender.com/post_user", {
                username:username,
                email:email,
                password: password,
                token
               }).then(data => {
                 
                 warning && showWarning(0)
                 
                 displayMessage(1)
                 console.log("Data:" + data.data)
                 if (data.data == "Email sent")
                  setMessageStatus(1)
                 else {
                  setMessageStatus(0)
                 }
               }) :
              showWarning(1)
              
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
          {
            warning ?
              <div className="negative-message">
                <div>All fields are mandatory</div>
              </div>
              :
              null
          }
        </div>  
      </form>
    </Layout>
  )
}
