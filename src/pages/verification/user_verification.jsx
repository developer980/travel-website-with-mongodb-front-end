import React from 'react'
import { useParams } from 'react-router'
import Axios from "axios"
import { useState } from 'react'
import "./verification.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ls from "localstorage-slim"

ls.config.encrypt = true

export default function User_verification() {
  const token = useParams().token
  
  // const {email} = useSelector(state => state.date)

  // console.log(email)

  const email = ls.get('check_eml')

  
console.log(email)

  const[message, setMessage] = useState(0)
  console.log(token)
  Axios.post("https://mydestinationapp.onrender.com/confirm_user", {
    email: email,
    token: token,
  }).then(data => {
    console.log(data.data)
    const response = data.data
    console.log("response: " + response)
    if (response.email) {
      ls.set('eml', response.email)
      ls.set('usr', response.username)
      window.open("https://travel-website-with-mongodb-front-end-bszn.vercel.app/", "_self")
    }
    else {
      console.log("Token is invalid :(")
    }
  })
  return <div>
    User confirmation failed
  </div>
  
}
