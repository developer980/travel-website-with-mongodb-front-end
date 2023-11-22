import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import "./form.css";
import Axios from "axios";
import bcrypt from "bcryptjs"
import { Link } from 'react-router-dom';
import ls from "localstorage-slim";

const salt = bcrypt.genSaltSync(10, (err, salt) => {
  console.log("salt = " + salt)
})

ls.config.encrypt = true;

console.log("Email: " + ls.get("check_eml"))

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let token = ""

function generateToken() {
  for (let i = 0; i < 25; i++)
    token += characters[Math.floor(Math.random() * characters.length)]
  //setToken(token)
}

export default function Form1() {
   // const[username, setName] = useState('')
    const[email, setLocation] = useState('')
  const [password, setPrice] = useState('')
  
  // const [warning, setWarning] = useState(0)

  const message = "Wake up!";
  Axios.post("https://mydestinationapp.onrender.com/wake_up", {
    message:message
  }).then(data => {
    data && console.log(data)
  })

  const [status, setStatus] = useState({
    showMessage:0,
    failed: 0,
    message: ''
  })
  console.log("failed = " + 0)

    //console.log("Name = " + username)
    console.log("Location = " + email)
    console.log("Price = " + password)
  return (
    <Layout>
        <form className = "user-form" action="" onSubmit={() => {
         
      }}>
        <h1 className='title'>
          Sign in
        </h1>
        <span className='field-name'>Email</span>
        <input onChange = {(e) => setLocation(e.target.value)} type="email" placeholder='Insert email'/>
        <span className='field-name'>Password</span>
        <input onChange = {(e)=> setPrice(e.target.value)} type="password" placeholder='Insert password'/>
        <div className = "user-form__submit-section">
          <button onClick={(e) => {
    
            e.preventDefault()
            generateToken()
            console.log("token: " + token)

            const hashedpassword = bcrypt.hashSync(password)
            
            email && password ?
              Axios.post("https://mydestinationapp.onrender.com/search_user", {
                  //username:username,
                  email:email,
                  password: password,
                  token
              }).then((data) => {

                console.log("data" + data.data)

                if (data.data == "Email sent") {
                  ls.set('check_eml', email)
                  setStatus({
                    showMessage:1,
                    failed: 0,
                    message: `A confirmation email has been sent to ${email}`
                  })
                }
                else if (data.data == "error"){
                  setStatus({
                    showMessage:1,
                    failed: 1,
                    message: "Wrong email or password:("
                  })
                }
              }) :
              setStatus({
                showMessage:1,
                failed: 1,
                message: "Wrong email or password:("
              })
              token = ''
          }}>Log in</button>
          <span>Don't have an account?</span>
          <Link to="/form">Sign up</Link>

          <Link to= "/password_recovery">
            Forgot your password?
          </Link>

          {
            status.showMessage ?
              <div className={`${status.failed ? "negative-message" : "message"}`}>
                <div>{status.message}</div>
              </div>
              :
              null
          }

        </div>  
      </form>
    </Layout>
  )
}
