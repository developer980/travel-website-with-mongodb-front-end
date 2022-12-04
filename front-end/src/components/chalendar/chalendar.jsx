import React from 'react'
import "./chalendar.css"

export default function Chalendar() {
  return (
    <div id = "cld" className = "chalendar" style = {{display:"none"}}>
          <div className = "chalendar-header">Month</div>
          <div className = "chalendar-bar">              {
                  Array.from(Array(7)).map((item, index) => {
                      console.log(index);
                      return <div>{index}</div> 
                  })
              }</div>
          <div className="chalendar-content">
              {
                  Array.from(Array(30)).map((item, index) => {
                      console.log(index);
                      return <div>{index}</div> 
                  })
              }
          </div>
    </div>
  )
}
