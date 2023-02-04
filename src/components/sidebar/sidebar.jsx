import React from 'react'
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className = "sidebar">
        {/* <h1>Filter by:</h1> */}
        <div className="sidebar-flex">
            <div className='sidebar-flex-item'>
                <span className = "criteria-name">Price</span>
                  <span className="criteria">100$
                      <input type="range" onChange = {(e) => {
                          console.log(parseInt(e.target.value) * 3)
                  }} /> 300$</span>  
            </div>
            <div className='sidebar-flex-item'>
                <span className="criteria-name">Star rating</span>
                    <span className = 'item-flex criteria'>
                        <div className='star'>1</div><div  className='star'>2</div><div  className='star'>3</div><div  className='star'>4</div><div className='star'>5</div>
                    </span>
            </div>
        </div>
    </div>
  )
}
