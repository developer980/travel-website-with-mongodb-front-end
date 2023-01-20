import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import "./booking.css"
import Img from "../../icons/picture.svg"
import Layout from '../../components/layout/layout'
import Star from "../../icons/star.svg"
import Chalendar from '../../components/chalendar/chalendar'
import { useSelector } from 'react-redux'
import Guests from '../../components/guests/guests'
import Sidebar from '../../components/sidebar/sidebar'
import Hotel_post from '../hotel_post/hotel_post'
//import { isHtmlElement } from 'react-router-dom/dist/dom'

export default function Booking() {

  const [hotelArray, setHotels] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [chalendar, displayChalendar] = useState(false)
  const [guests, displayGuests] = useState(false)
  const [mode, setMode] = useState("")
  
  const { checkIn } = useSelector(state => state.date)
  const { checkOut } = useSelector((state) => state.date)

  const dateIn = {
    day:checkIn.split(".")[0],
    month:checkIn.split(".")[1],
    year:checkIn.split(".")[2],
  }
  const dateOut = {
    day:checkOut.split(".")[0],
    month:checkOut.split(".")[1],
    year:checkOut.split(".")[2],
  }

  console.log(dateIn)
  console.log(dateOut)
  
  //console.log(hotelArray)

  function display(action, value, mode, id, displayMode) {
    setMode(mode)
    value ? document.getElementById(id).style.display = "none" :
      document.getElementById(id).style.display = displayMode
      value ? action(false) : action(true)
  }

  return (
    <Layout>
      <div className = "layout-grid">
        <div className = "inputs"> 
          <input className = "inputs-left" type="text" placeholder='Search by location' onChange={(e) => {
            setKeyWord(e.target.value)
          }} />

          <input className="inputs-center" onClick={() => {
            display(displayChalendar, chalendar, "in", "chalendar", "block")
          }} type="text" placeholder='Date check-in' value={checkIn}/>

          <input className = "inputs-center" type="text" onClick = {() => {
            display(displayChalendar, chalendar, "out", "chalendar", "block")
          }} placeholder='Date check-out' value={checkOut} />
          
          <input className="inputs-center" type="text" onClick={() => {
            display(displayGuests, guests, null, "guests", "flex")
          }} placeholder='Guests' />  
          
          <button className = "inputs-right" onClick={() => {
            axios.post("http://localhost:3001/get_posts", {
              keyWord: keyWord.replace(" ", "+"),
              parameters: {
                checkIn:dateIn,
                checkOut:dateOut
              }
            }).then(data => {
              console.log(data.data)
              setHotels(data.data)
            })
          }}>Search</button>
          <Guests />
          
        <div className = "side-section"><Sidebar/></div>
        </div>
        <Chalendar mode={mode} />

        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3w9CFhn2FiIpAkXI7RtJbvQVRTP26hc67IYVg3hu&s" alt="" /> */}
        <div className = "posts">
          {
            hotelArray.length>1 && hotelArray.map(hotel => {
              // console.log(`https://maps.google.com/maps?q=${hotel.url_text.replace(" ", "&")}&t=&z=13&ie=UTF8&iwloc=&output=embed`)
              return (                                 
                  <Hotel_post url_text={hotel.url_text} url_href={hotel.url_href} location={hotel.location} img={hotel.img} price={hotel.price} />
              )
            })
          }
        </div>
        
      </div>
    </Layout>
  )
}
