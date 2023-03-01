import React from 'react'
import { useState } from 'react'
import "./guests.css"
import { setGuests } from '../../redux/reducer/date'
import { useDispatch } from 'react-redux'

export default function Guests() {
    const[no_adults, set_noAdults] = useState(0)
    const[no_children, set_noChildren] = useState(0)
    const [no_rooms, set_noRooms] = useState(0)
    const dispatch = useDispatch()

  return (
      <div id = "guests" className="container">
        <div className='section-row'>
            <div className="row-name">Adults</div>
            <div className = "row-contents">
                <div className="section-row-element">
                      <div className="minus-button" onClick={() => {
                        if (no_adults > 0) {
                            dispatch(setGuests({
                                adults: no_adults,
                                children: no_children,
                                room:no_rooms
                            }))
                            set_noAdults(no_adults - 1)
                        }
                      }}>-</div>
                </div>
                <div className="section-row-element">
                    <div className="value" >{no_adults}</div>
                </div>
                <div className="section-row-element">
                      <div className="plus-button" onClick={() => {
                            dispatch(setGuests({
                                adults: no_adults,
                                children: no_children,
                                room:no_rooms
                            }))
                          set_noAdults(no_adults + 1)
                    }}>+</div>
                </div>
            </div>
        </div>
        
        <div className='section-row'>
                <div className="row-name">Children</div>
                    <div className = "row-contents">
                <div className="section-row-element">
                    <div className = "minus-button" onClick={() => {
                          if (no_children > 0) {
                            dispatch(setGuests({
                                adults: no_adults,
                                children: no_children,
                                rooms:no_rooms
                            }))
                            set_noChildren(no_children - 1)
                          }
                      }}>-</div>
                </div>
                <div className="section-row-element">
                      <div className="value" >{no_children}</div>
                </div>
                <div className="section-row-element">
                    <div className= "plus-button" onClick={() => {
                        dispatch(setGuests({
                            adults: no_adults,
                            children: no_children,
                            rooms:no_rooms
                        }))
                        set_noChildren(no_children + 1)
                      }}>+</div>
                </div>
            </div>
        </div>
          
        <div className='section-row'>
            <div className="row-name">Rooms</div>
                <div className = "row-contents">
            
            <div className="section-row-element">
                <div className = "minus-button" onClick={() => {
                    if (no_rooms > 0) {
                        dispatch(setGuests({
                            adults: no_adults,
                            children: no_children,
                            rooms:no_rooms
                        }))
                            set_noRooms(no_adults - 1)
                        }
                    }}>-</div>
                </div>
            
                <div className="section-row-element">
                    <div className="value" >{no_rooms}</div>
                </div>
            
                <div className="section-row-element">
                    <div className="plus-button" onClick={() => {
                        dispatch(setGuests({
                            adults: no_adults,
                            children: no_children,
                            rooms:no_rooms
                        }))
                        set_noRooms(no_adults + 1)
                    }}>+</div>
                </div>
            </div>
        </div>
    </div>
  )
}
