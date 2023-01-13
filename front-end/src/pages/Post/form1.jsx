import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import "./form.css";
import Axios from "axios";
import bcrypt from "bcryptjs"
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

export default function Form1() {
   // const[username, setName] = useState('')
    const[email, setLocation] = useState('')
    const[password, setPrice] = useState('')

    //console.log("Name = " + username)
    console.log("Location = " + email)
    console.log("Price = " + password)
  return (
    <Layout>
        <form action="" onSubmit={() => {
         
        }}>
                <span>Email</span>
                <input onChange = {(e) => setLocation(e.target.value)} type="email" placeholder='Insert email'/>
                <span>Password</span>
                <input onChange = {(e)=> setPrice(e.target.value)} type="password" placeholder='Insert password'/>
                <button onClick={(e) => {
                e.preventDefault()
            generateToken()
            console.log("token: " + token)
                Axios.post("http://localhost:3001/post_user", {
                    //username:username,
                    email:email,
                    password: password,
                    token
                })
            token = ''
                }}>Log in</button>
        </form>
    </Layout>
  )
}
