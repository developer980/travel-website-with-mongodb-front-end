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
import ls from "localstorage-slim"
import X from "../../icons/x.svg"

ls.config.encrypt = true
//import { isHtmlElement } from 'react-router-dom/dist/dom'

export default function Booking() {

  const [hotelArray, setHotels] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  // const [chalendar, displayChalendar] = useState({
  //   display: 0,
  //   mode:''
  // })
  const [guests, displayGuests] = useState(false)
  const [mode, setMode] = useState("")
  const [search, setSearch] = useState(0)
  const [chalendar, displayChalendar] = useState(false)

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
  

  const [list, setList] = useState([])

  console.log(list.length)

  if (list.length == 0 && ls.get("eml"))
    axios.post("https://mydestinationapp.onrender.com/get_favourites", {
    email: ls.get("eml")
    }).then(data => {
      console.log("searching data")
      // data.data.map(item => {
      //     setList(...list, item)
      //     //console.log(item)
      // })
      data.data.favs[0] && setList(data.data.favs)
    })

  //console.log(hotelArray)

  function display(action, value, mode, id, displayMode) {
    setMode(mode)
    value ? document.getElementById(id).style.display = "none" :
      document.getElementById(id).style.display = displayMode
      value ? action(false) : action(true)
  }

  return (
    <Layout mode = "book">
      <div className = "layout-grid">
        <div className = "inputs"> 
          <input className = "inputs-left" type="text" placeholder='Destination' onChange={(e) => {
            setKeyWord(e.target.value)
          }} />

          <input className="inputs-center" onClick={() => {
            display(displayChalendar, chalendar, "in", "chalendar", "block")     
            // setMode('in')
            // chalendar.display ? displayChalendar({
            //   display: 0,
            //   mode:"in"
            // }) : displayChalendar({
            //   display: 1,
            //   mode:"in"
            // })
          }} type="text" placeholder='Date check-in' value={checkIn}/>

          <input className = "inputs-center" type="text" onClick = {() => {
            display(displayChalendar, chalendar, "out", "chalendar", "block")     
            // chalendar.display ? displayChalendar({
            //   display: 0,
            //   mode:"out"
            // }) : displayChalendar({
            //   display: 1,
            //   mode:"out"
            // })
          }} placeholder='Date check-out' value={checkOut} />
          
          <input className="inputs-center" type="text" onClick={() => {
            display(displayGuests, guests, null, "guests", "flex")
          }} placeholder='Guests' />  
          
          <button className="inputs-right" onClick={() => {
            setSearch(1)
            axios.post("https://mydestinationapp.onrender.com/get_posts", {
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
        {/* {
          chalendar.display ?
            <Chalendar mode={chalendar.mode} /> : null
        } */}
        <div id = "chalendar" className='chalendar-window' style = {{display:"none"}}>
          <img src={X} className="close-button" onClick={() => {
            document.getElementById("chalendar").style.display = "none"
            displayChalendar(false)
          }} />
          <Chalendar mode={chalendar.mode} />
        </div>

        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3w9CFhn2FiIpAkXI7RtJbvQVRTP26hc67IYVg3hu&s" alt="" /> */}
        <div className = "posts">
          {
            search ?
            hotelArray.length > 1 ? hotelArray.map(hotel => {
              console.log(hotel)
              // console.log(`https://maps.google.com/maps?q=${hotel.url_text.replace(" ", "&")}&t=&z=13&ie=UTF8&iwloc=&output=embed`)
              return (                                 
                  <Hotel_post list = {list} rating_stars = {hotel.rating_stars} url_text={hotel.url_text} url_href={hotel.url_href} location={hotel.location} img={hotel.img} price={hotel.price} />
              )
            }) :
                
              <div className='waiting'>
                <div className='spinner'>

                </div>
                <div className='waiting-message'>
                      Searching...
                </div>
              </div>
              : 
              <div className = "posts-placeholder">
                Search for a destination
                {/* {"€ 100".replace("€ ", "")} */}
              </div>
          }
        </div>
        
      </div>
    </Layout>
  )
}
