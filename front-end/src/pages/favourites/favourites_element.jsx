import React from 'react'
import "./favourites.css"
import { Link } from 'react-router-dom'
import Mark from "../../icons/mark.svg"

export default function favourites_element(props) {
  const { name, price, url, img } = props
  return (
    <div className="fav-list-elem">
      <div className='elem-img'>
        <img className="elem-img-content" src={img} />
        <div className='unmark'>
          <img src={Mark} alt="" />
        </div>
      </div>
      <div className="elem-info">
        <div className = "elem-name">
            {name}
        </div>
        <div className = "elem-links">
          {
            url.map((path, index) => {
              return <a className = "elem-link" href={path} target = "_blank" rel="noopener noreferrer">
                 {price[index].website}
              </a>
            })
          }
        </div>
              {/* <div>
                  {url[0]}
              </div> */}
      </div>      
    </div>
  )
}
