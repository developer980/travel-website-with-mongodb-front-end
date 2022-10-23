import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/layout'
import "./form.css";

export default function Form() {
    const[name, setName] = useState('')
    const[location, setLocation] = useState('')
    const[price, setPrice] = useState('')
  return (
    <Layout>
        <form action="">
            <span>Insert name</span>
            <input id = "name" type="text" placeholder='Insert name'/>
            <span>Insert location</span>
            <input type="text" placeholder='Insert location'/>
            <span>Insert price</span>
            <input type="text" placeholder='Insert price'/>
            <button>Post your location</button>
        </form>
    </Layout>
  )
}
