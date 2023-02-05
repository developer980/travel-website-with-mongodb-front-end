import React from 'react'
import Layout from "../../components/layout/layout"
import ls from "localstorage-slim"
import axios from 'axios'; 
import "./favourites.css"
import Favourites_element from './favourites_element';
import { useState } from 'react';
import { Link } from 'react-router-dom';

ls.config.encrypt = true;

export default function Favourites() {
    
    const [list, setList] = useState([])
    const link = <Link className='place-holder__link' to="/booking_page">destination</Link>
    console.log(list)
    if (list.length == 0 && ls.get("eml"))
        axios.post("https://mydestinationapp.onrender.com/get_favourites", {
            email: ls.get("eml")
        }).then(data => {
            console.log(data.data.favs)
            data.data.favs[0] && setList(data.data.favs)
        })
    return (
      <Layout>
          <div className="fav-list">
              {
                  list.map((item, index) => {
                      return <Favourites_element name={item.name} price = {item.price} url = {item.link} img = {item.img} />
                  })
                //    :
                //       <div className="list__place-holder">It seems you have no preferences yet. You can start by searching a {link}
                //           {/* <br /> */}
                //       </div>
              }
          </div>
      </Layout>
  )
}

export function setFavs(list, setList) {
    axios.post("https://mydestinationapp.onrender.com/get_favourites", {
        email: ls.get("eml")
    }).then(data => {
        console.log(data.data.favs)
        !list.length && setList(data.data.favs)
    })
}