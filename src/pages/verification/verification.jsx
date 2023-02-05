import React from 'react'
import { useParams } from 'react-router'
import Axios from "axios"
import { useState } from 'react'
import "./verification.css"
import { Link } from 'react-router-dom'


export default function Verification() {
    const token = useParams().token
  const[message, setMessage] = useState(0)
  console.log(token)
  Axios.post("https://mydestinationapp.onrender.com/verify_token", {
    token:token
  }).then(data => {
    console.log(data)
    data && setMessage(1)
  })
  return message ?
        <div className='message-container'>
      <div>Your email has been confirmed, you can now return to the
        <Link to = "/log_in">login page</Link></div> 
        </div>
        :
        <div>
          User confirmation failed :(
        </div>
  
}
