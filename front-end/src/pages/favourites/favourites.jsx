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
    axios.post("http://localhost:3001/get_favourites", {
        email: ls.get("eml")
    }).then(data => {
        console.log(data.data.favs)
        // data.data.map(item => {
        //     setList(...list, item)
        //     //console.log(item)
        // })
        !list.length && setList(data.data.favs)
    })
  return (
      <Layout>
          <div className="fav-list">
              {
                  list && list.map((item) => {
                      return <Favourites_element name={item.name} price = {item.price} url = {item.link} img = {item.img} />
                  })
              }
          </div>
      </Layout>
  )
}
