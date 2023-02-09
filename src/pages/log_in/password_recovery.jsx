import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import axios from 'axios'
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
  return (
    <Layout>
        <form className="user-form" action="">
          <span className='field-name'>Insert your email address</span>
          <input onChange = {(e) => setEmail(e.target.value)} id = "name" type="text" placeholder='Insert email'/>

          <button>
            Send recovery email
          </button>
        </form>
    </Layout>
  )
}
