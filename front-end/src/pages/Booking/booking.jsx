import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import "./booking.css"
import Img from "../../icons/picture.svg"
import Layout from '../../components/layout/layout'
//import { isHtmlElement } from 'react-router-dom/dist/dom'

export default function Booking() {

  const [hotelArray, setHotels] = useState([]);
  console.log(hotelArray)

  axios.get("http://localhost:3001/get_posts").then(data => {
    console.log(data.data)
    !hotelArray.length && setHotels(data.data)
  })
  return (
    <Layout>
      {
        hotelArray.map(hotel => {
          return(
            <div className = "hotel-post">
              <div>
                <img className = "hotel-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3w9CFhn2FiIpAkXI7RtJbvQVRTP26hc67IYVg3hu&s" alt="" />
                <a href={hotel.url_href} target = "_blank" rel="noopener noreferrer">{hotel.url_text}</a>
              </div>
              <div className = "middle">
                <span>
                  {hotel.description}
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
                  <button>
                    See available rooms
                  </button>
                </div>
                
              </div>
            </div>
          )
        })
      }
    </Layout>
  )
}
