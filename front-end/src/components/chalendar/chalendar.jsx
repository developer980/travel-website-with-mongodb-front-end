import React from 'react'
import "./chalendar.css"
import { useState } from 'react'
import { connect } from 'react-redux'
// import setCheckIn from '../../redux/action/date_in'
// import setCheckOut from '../../redux/action/date_out'
import { useDispatch, useSelector } from 'react-redux'
import { setCheckIn, setCheckOut } from '../../redux/reducer/date'

export default function Chalendar(props) {

  const dispatch = useDispatch();

  const { mode } = props
  console.log("mode " + mode)
  const months = ["January","February","March","April","May","June","July",
  "August", "September", "October", "November", "December"]
  
  const [amount, setMonth] = useState(0)
  const [year_index, setYear] = useState(0)

  const [checkIn, setDateIn] = useState(0)
  const [checkOut, setDateOut] = useState(0)

  //const [color, setColor] = useState("green")
  
  console.log("Date in " + checkIn)
  
  console.log("Date out " + checkOut)

  let num = 0;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    
  const date = new Date();
  //console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())
  
  let month_days = new Date(date.getFullYear(), date.getMonth() + amount + 1, 0).getDate()
  const last_month_days = new Date(date.getFullYear() + year_index, date.getMonth() + amount, 0).getDate()
  const first_month_day = new Date(date.getFullYear() + year_index, date.getMonth() + amount, 0).getDay()
  const last_month_day = new Date(date.getFullYear() + year_index, date.getMonth() + amount + 1, 0).getDay()
  const current_year = new Date().getFullYear() + year_index;

  let day_index = first_month_day
  let day = 1;
  let total_days  = 1
  const month_index = new Date(date.getFullYear() + year_index, date.getMonth()).getMonth()

  //console.log("month " + month)

  return (
    <div id = "chalendar" className = "chalendar" style = {{display:"none"}}>
      <div className="chalendar-header">

        <button onClick={() => {
          if (month_index + amount > 0)
            setMonth(amount - 1)
          else {
            setMonth(months.length - month_index - 1)
            setYear(year_index - 1)
          }
        }}>Left</button>

        {months[month_index + amount]}

        <button onClick={() => {
          if (month_index + amount < months.length - 1)
            setMonth(amount + 1)
          else {
            setMonth(-month_index)
            setYear(year_index + 1)
          }
        }}>Right
        </button>
      </div>
      
      <div className = "chalendar-bar">              {
              Array.from(Array(7)).map((item, index) => {
                //   console.log(index);
                  return <div>{days[index]}</div> 
              })
          }</div>
      <div className="chalendar-content">
        {
          Array.from(Array(first_month_day)).map((item, index) => {
            day_index -= 1
            
            total_days++
              return <div className='chalendar-content__day chalendar-content__day--faded'>{last_month_days - day_index}</div> 
          })
        }
        {
          Array.from(Array(month_days)).map((item, index) => {
            //day++
            total_days++
            //console.log(day);
            const item_date = index + 1
            
            const month = month_index + amount + 1

            return <div id={index} onClick={() => {
              if (!checkIn) {
                setDateIn(current_year + "-" + month + "-" + item_date)
                dispatch(setCheckIn(item_date + "." + month + "." + current_year))
              }
              
              else {
                const selected_date = current_year + "-" + month + "-" + item_date
                if (mode == "in") {
                  setDateIn(current_year + "-" + month + "-" + item_date)
                  dispatch(setCheckIn(item_date + "." + month + "." + current_year))
                }
                  
                else {
                  setDateOut(current_year + "-" + month + "-" + item_date)
                  dispatch(setCheckOut(item_date + "." + month + "." + current_year))
                  if (new Date(selected_date) < new Date(checkIn)) {
                    const new_date = item_date - 1;
                    setDateOut(current_year + "-" + month + "-" + item_date)
                    setDateIn(current_year + "-" + month + "-" + new_date)
                    dispatch(setCheckOut(item_date + "." + month + "." + current_year))
                    dispatch(setCheckIn(new_date + "." + month + "." + current_year))
                  }
                }
              }
              
            }} className={`chalendar-content__day chalendar-content__day--clear ${new Date(current_year + "-" + month + "-" + item_date) >= new Date(checkIn) && new Date(current_year + "-" + month + "-" + item_date) <= new Date(checkOut) ?
                "chalendar-content__day--green"
                :
                "chalendar-content__day--none"}`}>{index + 1}</div> 
          

            })
        }
        {
          Array.from(Array(7 - last_month_day)).map((item, index) => {
            return <div className='chalendar-content__day chalendar-content__day--faded'>{index + 1}</div> 
          })
        }
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    setCheckIn: (payload) => setCheckIn(payload),
    setCheckOut: (payload) => setCheckOut(payload)
  }
}