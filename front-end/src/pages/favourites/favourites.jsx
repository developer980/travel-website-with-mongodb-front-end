import React from 'react'
import Layout from "../../components/layout/layout"
import ls from "localstorage-slim"
import axios from 'axios'; 
import "./favourites.css"
import Favourites_element from './favourites_element';
import { useState } from 'react';

ls.config.encrypt = true;

export default function Favourites() {
    
    const [list, setList] = useState([])
    console.log(list)
    !list.length && axios.post("http://localhost:3001/get_favourites", {
        email: ls.get("eml")
    }).then(data => {
        console.log(data.data.favs)
        !list.length && setList(data.data.favs)
    })
  return (
      <Layout>
          <div className="fav-list">
              {
                  list && list.map((item, index) => {
                      return <Favourites_element name={item.name} price = {item.price} url = {item.link} img = {item.img} />
                  })
              }
          </div>
      </Layout>
  )
}

export function setFavs(list, setList) {
    axios.post("http://localhost:3001/get_favourites", {
        email: ls.get("eml")
    }).then(data => {
        console.log(data.data.favs)
        !list.length && setList(data.data.favs)
    })
}