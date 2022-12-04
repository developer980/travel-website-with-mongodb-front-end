import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import "./booking.css"
import Img from "../../icons/picture.svg"
import Layout from '../../components/layout/layout'
import Star from "../../icons/star.svg"
import Chalendar from '../../components/chalendar/chalendar'
//import { isHtmlElement } from 'react-router-dom/dist/dom'

export default function Booking() {

  const [hotelArray, setHotels] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [chalendar, displayChalendar] = useState(false)
  console.log(hotelArray)

  function display(action, value) {
    chalendar ? document.getElementById("cld").style.display = "none" :
      document.getElementById("cld").style.display = "block"
      value ? action(false) : action(true)
  }

  return (
    <Layout>
      <div className = "inputs"> 
        <input className = "inputs-left" type="text" placeholder='Search by location' onChange={(e) => {
          setKeyWord(e.target.value)
        }} />

        <input className="inputs-center" onClick={() => {
          display(displayChalendar, chalendar)
        }} type="text" placeholder='Date check-in' />

        <input className = "inputs-center" type="text" onClick = {() => {
          display(displayChalendar, chalendar)
        }} placeholder='Date check-out'/>
        <input className = "inputs-center" type="text"  placeholder='Guests'/>  
        <button className = "inputs-right" onClick={() => {
          axios.post("http://localhost:3001/get_posts", {
            keyWord:keyWord.replace(" ", "+")
          }).then(data => {
            console.log(data.data)
            setHotels(data.data)
          })
        }}>Search</button>
      </div>
      <Chalendar/>
      {
        hotelArray.map(hotel => {
          return(
            <div className = "hotel-post">
              <div>
                <div className = "hotel-img">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3w9CFhn2FiIpAkXI7RtJbvQVRTP26hc67IYVg3hu&s" alt="" />
                </div>
                <h3>{hotel.url_text}</h3>
              </div>
              <div className="middle">
                <span className='description'>
                  {hotel.description}
                </span>
                
                {/* <span>
                  {hotel.notes}
                </span> */}

                <span className='rating'>
                  {
                    hotel.rating_stars ? Array.from(Array(hotel.rating_stars)).map((item, index) =>
                      <img src = {Star}/>
                    ) :
                      <span>
                        House property
                      </span>
                  }
                </span>
                <span className = "location">
                  {hotel.location}
               </span>
                <span className = "price">
                  {hotel.price}
              </span> </div>
              <div>
                <div>
                  See reviews
                </div>
                <div>
                  <a href={hotel.url_href} target = "_blank" rel="noopener noreferrer">
                    Visit the page
                  </a>
                </div>
                
              </div>
            </div>
          )
        })
      }
    </Layout>
  )
}
