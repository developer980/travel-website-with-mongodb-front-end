import React from 'react'
import Header from '../header/header'

export default function Layout(props) {
  return (
    <div style={{ height: "100%", position:"absolute", left:"0px",right:"0px"}}>
        <Header/>
        {/* <div style = {{marginTop:"0px", height:"auto"}}> */}
          {props.children}
        {/* </div> */}
    </div>
  )
}
