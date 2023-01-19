import React from 'react'
import Star from "../../icons/star.svg"
import Mark from "../../icons/mark.svg"

export default function Hotel_post(props) {
    const { img, rating_stars, location, price, url_href, url_text } = props;

    console.log(price)
  return (
    
    <div className = "hotel-post">
        <div className = "hotel-img">
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
        <span className = "location">
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
  )
}
