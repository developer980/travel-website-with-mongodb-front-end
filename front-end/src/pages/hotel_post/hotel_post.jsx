import React from 'react'
import Star from "../../icons/star.svg"
import Mark from "../../icons/mark.svg"
import Filled_mark from '../../icons/mark_filled.svg'
import { useState } from 'react';
import ls from "localstorage-slim";
import axios from "axios"
import "./hotel_post.css"

ls.config.encrypt = true;

export default function Hotel_post(props) {
    const { img, list, rating_stars, location, price, url_href, url_text } = props;
    const [array, setArray] = useState(list)
    const [map, showMap] = useState(0)
    const [status, setStatus] = useState({
        marked: 0,
        inList: 0
    })
    //const [added, add] = useState(0)

    console.log(status)

    if(list)
        for (let i = 0; i < list.length; i++){
            if (list[i].name == url_text) {
                
                if (!status.inList && !status.marked) {
                    setStatus({
                            marked: 1,
                            inList: 1
                    })
                }
                // console.log(li)
                //break;
            }
        }
    
    // !marked && isInList && setMark(1)
    //console.log(price)
    //marked && console.log(url_text + " " + marked)
  return (
      <>
          {/* <img src={Filled_mark} alt="" /> */}
        <div className="hotel-post">
            <div className="hotel-img">
            {/* <div className = "hotel-img"> */}
                <img className="main-img" name = "image" src={img} alt="" />
                    <div className='hotel-mark' onClick={() => {
                        if (!status.marked) {
                            axios.post("https://mydestinationapp.onrender.com/add_tofav", {
                                name: url_text,
                                link: url_href,
                                price: price,
                                img: img,
                                id: ls.get("i"),
                                email: ls.get("eml")
                            })
                            //setMark(1)
                            setStatus(prevStatus => {
                                return {
                                    marked: 1,
                                    inList:prevStatus.inList
                                }
                            })
                        }
                        else {
                            axios.post("https://mydestinationapp.onrender.com/remove_fromFav", {
                                email: ls.get("eml"),
                                name: url_text
                            })

                            setStatus(prevStatus => {
                                return {
                                    marked: 0,
                                    inList:prevStatus.inList
                                }
                            })
                            //setMark(0)
                            //   setArray(list.splice(list.indexOf(url_text), 1))
                        }
                }}>
                        {status.marked ? <img src={Filled_mark} alt="" /> : <img src={Mark} alt="" />}
                </div>
            {/* </div> */}
                </div>
            <div className = "hotel-post__content">
                <div className="middle">
            
                    <h3 className='hotel-post__title'>{url_text}</h3>
                        
                    <span className='rating'>
                        {
                        rating_stars ? Array.from(Array(rating_stars)).map((item, index) =>
                            <img src = {Star}/>
                        ) :
                            <span>
                                Reviews not available
                            </span>
                        }
                    </span>
                    <span className="location" onClick={() => {
                                map ? showMap(0) :
                                    showMap(1)
                    }}>
                        Show on the map
                    </span>
                </div>
                <div className = 'links'>
                    {price.map((price, index) => {
                        console.log(price.value.replace("€", "").trim())
                        if(price.value) return <a href={url_href[index]} target = "_blank" rel="noopener noreferrer">
                            <div>
                            {price.value} €
                            </div>
                        <span>{price.website}</span>
                        </a>
                    })}
            
                </div>
            </div>
        </div>
          {
              map ? 
              
                <div className = "hotel-map">
                    <iframe id="gmap_canvas" src={`https://maps.google.com/maps?q=${url_text.replace(" ", "%")}%${location.replace(" ", "%")}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </div>
                  :
                null
          }
    </>
  )
}
