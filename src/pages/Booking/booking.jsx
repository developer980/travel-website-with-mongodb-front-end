import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import "./booking.css"
import Img from "../../icons/picture.svg"
import Layout from '../../components/layout/layout'
import Star from "../../icons/star.svg"
import Chalendar from '../../components/chalendar/chalendar'
import { useSelector, useDispatch } from 'react-redux'
import { setMode } from '../../redux/reducer/date'
import Guests from '../../components/guests/guests'
import Sidebar from '../../components/sidebar/sidebar'
import Hotel_post from '../hotel_post/hotel_post'
import ls from "localstorage-slim"
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import X from "../../icons/x.svg"

ls.config.encrypt = true
//import { isHtmlElement } from 'react-router-dom/dist/dom'

export default function Booking() {

  const { returned_params } = useLocation()
  const params = new URLSearchParams(returned_params)
  const destination = params.get("destination")
  console.log(destination)
  // const {in} = useParams()
  // const { loc } = useParams()
  // const { out } = useParams()

  // console.log("loc " + loc)
  // console.log("out " + out)

  const dispatch = useDispatch()

  const [hotelArray, setHotels] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [guests, displayGuests] = useState(false)
  // const [mode, setMode] = useState("")
  const [search, setSearch] = useState(0)

  const { checkIn } = useSelector(state => state.date)
  const { checkOut } = useSelector((state) => state.date)
  const { email } = useSelector(state => state.date)

  console.log('view')
  
  const{guests_number} = useSelector(state => state.date)
  const { displayMode } = useSelector(state => state.date)
  
  const message = "Wake up!";
  axios.post("https://mydestinationapp.onrender.com/wake_up", {
    message:message
  }).then(data => {
    
    console.log("data")
    console.log(data)
  })

  console.log(guests_number)
  
  let adults = 2;
  let children = 1;
  let rooms = 1;
  let today = new Date();
  
  if (guests_number) {
    if (guests_number.adults) adults = guests_number.adults
    if (guests_number.children) children = guests_number.children
    if (guests_number.rooms) rooms = guests_number.rooms
  }
  console.log(email)


  const dateIn = {
    day: checkIn.split(".")[0],
    month: checkIn.split(".")[1],
    year: checkIn.split(".")[2],
  }

  const dateOut = {
    day: checkOut.split(".")[0],
    month: checkOut.split(".")[1],
    year: checkOut.split(".")[2],
  }

  console.log(dateIn)
  console.log(dateOut)

  console.log(`${dateOut.day}.${dateOut.month}.${dateOut.year}`)
  

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(1)
      //https://mydestinationapp.onrender.com/get_posts
                axios.post("https://hotel-search-engine.onrender.com/get_posts", {
                  keyWord: keyWord.replace(" ", "+"),
                  parameters: {
                    checkIn:dateIn,
                    checkOut:dateOut
                  }
                }).then(data => {
                  console.log(data.data)
                  setHotels(data.data)
                })
    }
  }

  return (
    <Layout mode = "book">
      <div className = "layout-grid">
        <div className="inputs"> 
          <div className = "search-section">
            <div className='inputs__search-section'>
              <input name = "destination" className = "inputs__element inputs-left" type="text" placeholder='Destination' onKeyDown = {handleKeyDown} onChange={(e) => {
                setKeyWord(e.target.value)
                }} />
            </div>
            <div className='inputs__section'>
              <input name = "checkIn" className="inputs__element inputs-center-left" onClick={() => {
                dispatch(setMode({
                  mode: "in",
                  display: 1
                }))

              }} onKeyDown = {handleKeyDown} type="text" placeholder='Date check-in' value={checkIn}/>
              
                
              <input name = "checkOut" className="inputs__element inputs-center-middle" type="text" onKeyDown = {handleKeyDown} onClick={() => {
                dispatch(setMode({
                  mode: "out",
                  display: 1
                }))

              }} placeholder='Date check-out' value={checkOut} />
            </div>
            <div className='inputs__section'>
              <input name = "guests" className="inputs__element inputs-center-right" onKeyDown = {handleKeyDown} type="text" onClick={() => {
                display(displayGuests, guests, null, "guests", "flex")
              }} value={
                `${rooms} rooms for ${adults} adults and ${children} children`
              } />  
              
              <button className="inputs__element search-button inputs-right" onClick={() => {
                setSearch(1)
                axios.post("https://hotel-search-engine.onrender.com/get_posts", {
                  keyWord: keyWord.replace(" ", "+"),
                  parameters: {
                    checkIn:dateIn,
                    checkOut:dateOut
                  }
                }).then(data => {
                  console.log("response")
                  console.log(data.data)
                  setHotels(data.data)
                })
              }}>Search</button>
                <Guests />
            </div>
          </div>
          
          <div className = "filter-section"><Sidebar/></div>
        </div>
        
        {
          //  style={{ display: "none" }}
          displayMode.display ? <div id="chalendar" className='chalendar-window'>
              <Chalendar />
            </div> :
          null
        }

        <div className="posts">
       
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
                
                {/* {"€ 100".replace("€ ", "")} */}
              </div>
          }
        </div>
        
      </div>
    </Layout>
  )
}
