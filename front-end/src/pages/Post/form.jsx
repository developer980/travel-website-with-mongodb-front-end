import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import "./form.css";
import Axios from "axios";

export default function Form() {
    const[name, setName] = useState('')
    const[location, setLocation] = useState('')
    const[price, setPrice] = useState('')

    console.log("Name = " + name)
    console.log("Location = " + location)
    console.log("Price = " + price)
  return (
    <Layout>
        <form action="" onSubmit={() => {
         
        }}>
            <span>Insert name</span>
            <input onChange = {(e) => setName(e.target.value)} id = "name" type="text" placeholder='Insert name'/>
            <span>Insert location</span>
            <input onChange = {(e) => setLocation(e.target.value)} type="text" placeholder='Insert location'/>
            <span>Insert price</span>
            <input onChange = {(e)=> setPrice(e.target.value)} type="text" placeholder='Insert price'/>
            <button onClick={(e) => {
              e.preventDefault()
               Axios.post("http://localhost:3001/post_destination", {
                name:name,
                location:location,
                price:price
              })
            }}>Post your location</button>
        </form>
    </Layout>
  )
}
