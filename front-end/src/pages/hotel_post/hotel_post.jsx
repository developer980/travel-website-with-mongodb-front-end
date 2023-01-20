import React from 'react'
import Star from "../../icons/star.svg"
import Mark from "../../icons/mark.svg"
import { useState } from 'react';

export default function Hotel_post(props) {
    const { img, rating_stars, location, price, url_href, url_text } = props;
    const [map, showMap] = useState(0)

    console.log(price)
  return (
    <>
      <div className="hotel-post">
          <div className = "map">
          </div>
        <div className="hotel-img">
        {/* <div className = "hotel-img"> */}
              <img className="main-img" src={img} alt="" />
              <div className='hotel-mark'>
                <img src={Mark} alt="" />
              </div>
        {/* </div> */}
        </div>
        <div className="middle">
        
        <h3>{url_text}</h3>
        
        {/* <span>
            {hotel.notes}
        </span> */}

        <span className='rating'>
            {
            rating_stars ? Array.from(Array(rating_stars)).map((item, index) =>
                <img src = {Star}/>
            ) :
                <span>
                Rating stars not available
                </span>
            }
        </span>
                  <span className="location" onClick={() => {
                      map ? showMap(0) :
                          showMap(1)
        }}>
            {location}
        </span>
        {/* <span className = "price">
            {hotel.price}
        </span>  */}
        </div>
        <div className = 'links'>
            {price.map((price, index) => {
                //console.log("price " + index + ": " + price)
                // if (index <= price.length)
                if(price.value) return <a href={url_href[index]} target = "_blank" rel="noopener noreferrer">
                    <div>
                    {price.value} RON
                    </div>
                <span>{price.website}</span>
                </a>
            })}
      
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
