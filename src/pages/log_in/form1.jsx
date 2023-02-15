import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import "./form.css";
import Axios from "axios";
import bcrypt from "bcryptjs"
import setToken from '../../redux/action/token';
import { Link } from 'react-router-dom';
import ls from "localstorage-slim";

const salt = bcrypt.genSaltSync(10, (err, salt) => {
  console.log("salt = " + salt)
})

//ls.config.encrypt = true;

console.log("Email: " + ls.get("eml"))

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
  const [failed, isFailed] = useState('')
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
            
            email && password ?
              Axios.post("https://mydestinationapp.onrender.com/search_user", {
                  //username:username,
                  email:email,
                  password: password,
                  token
              }).then((data) => {

                console.log("data" + data.data)
                if (data.data && data.data != 'error') {
                  ls.set('eml', data.data.email)
                  ls.set('usr', data.data.username)
                  window.open("https://travel-website-with-mongodb-front-end-bszn.vercel.app/", "_self")
                }

                else if(data.data == 'error') {
                  console.log("no data")
                  isFailed('Wrong email or password :(')
                }
              }) : isFailed('Wrong email or password :(')
              token = ''
          }}>Log in</button>
          <span>Don't have an account?</span>
          <Link to="/form">Sign up</Link>

          {
            failed ?
              <div className= "negative-message">
                <div>{failed}</div>
              </div>
              :
              null
          }

          <Link to= "/password_recovery">
            Forgor your password?
          </Link>

        </div>  
      </form>
    </Layout>
  )
}
