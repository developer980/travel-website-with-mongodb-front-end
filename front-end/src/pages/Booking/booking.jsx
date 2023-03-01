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
import X from "../../icons/x.svg"

ls.config.encrypt = true
//import { isHtmlElement } from 'react-router-dom/dist/dom'

export default function Booking() {

  const dispatch = useDispatch()

  const [hotelArray, setHotels] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  // const [chalendar, displayChalendar] = useState({
  //   display: 0,
  //   mode:''
  // })
  const [guests, displayGuests] = useState(false)
  // const [mode, setMode] = useState("")
  const [search, setSearch] = useState(0)
  const [chalendar, displayChalendar] = useState(false)

  // const [view, getChalendar] = useState(0)
  
  // console.log("view " + view)

  const { checkIn } = useSelector(state => state.date)
  const { checkOut } = useSelector((state) => state.date)
  const { email } = useSelector(state => state.date)

  console.log('view')
  
  const{guests_number} = useSelector(state => state.date)

  const { displayMode } = useSelector(state => state.date)
  

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

  // const dateIn = {
  //   day:String(today.getDate()).padStart(2, '0'),
  //   month:String(today.getMonth() + 1).padStart(2, '0'),
  //   year:today.getFullYear()
  // }
  
	// let  dd 		= String(today.getDate()).padStart(2, '0');
	// let  mm 		= String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
	// let  yyyy 		= today.getFullYear();

  // if (checkIn) {
  //   dateIn.day = checkIn.split(".")[0]
  //   dateIn.month = checkIn.split(".")[1]
  //   dateIn.year = checkIn.split(".")[2]
  // }

  // const dateOut = {
  //   day:String(today.getDate() + 1).padStart(2, '0'),
  //   month:String(today.getMonth() + 1).padStart(2, '0'),
  //   year:today.getFullYear()
  // }
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

  return (
    <Layout mode = "book">
      <div className = "layout-grid">
        <div className="inputs"> 
          <div className = "search-section">
            <div className='inputs__search-section'>
              <input className = "inputs__element inputs-left" type="text" placeholder='Destination' onChange={(e) => {
                setKeyWord(e.target.value)
                }} />
            </div>
            <div className='inputs__section'>
              <input className="inputs__element inputs-center-left" onClick={() => {
                dispatch(setMode({
                  mode: "in",
                  display: 1
                }))
                // displayMode.display ? getChalendar(0) : getChalendar(1)
                // display(displayChalendar, chalendar, "in", "chalendar", "block")     
                // setMode('in')
                // chalendar.display ? displayChalendar({
                //   display: 0,
                //   mode:"in"
                // }) : displayChalendar({
                //   display: 1,
                //   mode:"in"
                // })
              }} type="text" placeholder='Date check-in' value={checkIn}/>
              
                
              <input className="inputs__element inputs-center-middle" type="text" onClick={() => {
                dispatch(setMode({
                  mode: "out",
                  display: 1
                }))
                // view ? getChalendar(1) : getChalendar(0)
                // display(displayChalendar, chalendar, "out", "chalendar", "block")     
                // chalendar.display ? displayChalendar({
                //   display: 0,
                //   mode:"out"
                // }) : displayChalendar({
                //   display: 1,
                //   mode:"out"
                // })
              }} placeholder='Date check-out' value={checkOut} />
            </div>
            <div className='inputs__section'>
              <input className="inputs__element inputs-center-right" type="text" onClick={() => {
                display(displayGuests, guests, null, "guests", "flex")
              }} value={
                `${rooms} rooms for ${adults} adults and ${children} children`
              } />  
              
              <button className="inputs__element search-button inputs-right" onClick={() => {
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
            </div>
          </div>
          
          <div className = "filter-section"><Sidebar/></div>
        </div>
        
        {
          //  style={{ display: "none" }}
          displayMode.display ? <div id="chalendar" className='chalendar-window'>
            <img src={X} className="close-button" onClick={() => {
              document.getElementById("chalendar").style.display = "none"
              displayChalendar(false)
            }} />
              <Chalendar />
            </div> :
          null
        }

        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3w9CFhn2FiIpAkXI7RtJbvQVRTP26hc67IYVg3hu&s" alt="" /> */}
        <div className="posts">
        {/* <Hotel_post list = {list} rating_stars = {4} url_text={"Hotel"} url_href={"/hotel"} location={"italy"} img={"https://cf.bstatic.com/xdata/images/hotel/square200/184333288.webp?k=00d9c006eb1fc320f72c1012b4d29578af89c72edb504cb1d84ccffc901e76cc&o=&s=1"} price={[{value:"100", website:"website.com"},{value:"120", website:"website.com"}]} /> */}
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
