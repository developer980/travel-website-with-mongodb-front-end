import React from 'react'
import Header from '../header/header'

export default function Layout(props) {
  const { mode } = props
  return (
    <div style={{ height: "100%", position:"absolute", left:"0px",right:"0px"}}>
        <Header mode = {mode}/>
        {/* <div style = {{marginTop:"0px", height:"auto"}}> */}
          {props.children}
        {/* </div> */}
    </div>
  )
}
