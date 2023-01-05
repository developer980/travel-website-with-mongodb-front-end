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
              console.log("price: " + hotel.price.length)
              return(
                <div className = "hotel-post">
                  <div className = "hotel-img">
                    {/* <div className = "hotel-img"> */}
                    <img className = "main-img" src={hotel.img} alt="" />
                    {/* </div> */}
                  </div>
                  <div className="middle">
                    
                    <h3>{hotel.url_text}</h3>
                    
                    {/* <span>
                      {hotel.notes}
                    </span> */}

                    <span className='rating'>
                      {
                        hotel.rating_stars ? Array.from(Array(hotel.rating_stars)).map((item, index) =>
                          <img src = {Star}/>
                        ) :
                          <span>
                            Rating stars not available
                          </span>
                      }
                    </span>
                    <span className = "location">
                      {hotel.location}
                  </span>
                    {/* <span className = "price">
                      {hotel.price}
                  </span>  */}
                  </div>
                  <div className = 'links'>
                    {hotel.price.map((price, index) => {
                      //console.log("price " + index + ": " + price)
                      // if (index <= price.length)
                       if(price.value) return <a href={hotel.url_href[index]} target = "_blank" rel="noopener noreferrer">
                          <div>
                            {price.value} RON
                          </div>
                        <span>{price.website}</span>
                      </a>
                    })}
                    
                  </div>
                </div>
              )
            })
          }
        </div>
        
      </div>
    </Layout>
  )
}
