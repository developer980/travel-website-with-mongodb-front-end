import React from 'react'
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className = "sidebar">
        <h1>Filter by:</h1>
        <div className="sidebar-flex">
            <div className='sidebar-flex-item'>
                <div className = "criteria-name">Price</div>
                <div className = "criteria">100$ - 300$</div>  
            </div>
            <div className='sidebar-flex-item'>
                <div className="criteria-name">Star rating</div>
                    <div className = 'item-flex criteria'>
                        <div className='star'>1</div><div  className='star'>2</div><div  className='star'>3</div><div  className='star'>4</div><div className='star'>5</div>
                    </div>
            </div>
            <div className='sidebar-flex-item'>
            </div>
            <div className='sidebar-flex-item'>
            </div>
        </div>
    </div>
  )
}
