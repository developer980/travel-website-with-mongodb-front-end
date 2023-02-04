import React from 'react'
import "./favourites.css"
import { Link } from 'react-router-dom'
import Filled_Mark from "../../icons/mark_filled.svg"
import ls from "localstorage-slim"
import axios from "axios"
import { setFavourites } from '../../redux/reducer/date'


ls.config.encrypt = true

export default function favourites_element(props) {
  const { name, price, url, img } = props
  return (
    <div className="fav-list-elem">
      <div className='elem-img'>
        <img className="elem-img-content" src={img} />
        <div className='unmark'>
          <img className = "unmark_img" src={Filled_Mark} onClick={() => {
            axios.post("http://localhost:3001/remove_fromFav", {
              email: ls.get('eml'),
              name:name
            }).then(data => {
              window.location.reload()
            })
          }} alt="" />
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
