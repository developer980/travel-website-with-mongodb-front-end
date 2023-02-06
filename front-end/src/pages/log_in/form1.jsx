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
  const[failed, isFailed] = useState(0)

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
                  Axios.post("https://mydestinationapp.onrender.com/search_user", {
                      //username:username,
                      email:email,
                      password: password,
                      token
                  }).then((data) => {
                    bcrypt.compare(password, data.data.password, (err, result) => {
                      
                      if (result) {
                        //console.log(data.data.id)
                        ls.set('eml', data.data.email)
                        ls.set('usr', data.data.username)
                        ls.set('i', data.data.id)
                        window.open("https://travel-website-with-mongodb-front-end-bszn-10d1oe6de.vercel.app/", "_self")
                      }
                      else {
                        isFailed(1)
                      }
                    })
                  })
              token = ''
          }}>Log in</button>
          <span>Don't have an account?</span>
          <Link to="/form">Sign up</Link>
          {
            failed ?
              <div className="negative-message">
                <div>Unable to find your account :(</div>
              </div>
              :
              null
          }
        </div>  
      </form>
    </Layout>
  )
}
