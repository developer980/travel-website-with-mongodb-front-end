import React from 'react'
import "./chalendar.css"
import { useState } from 'react'

export default function Chalendar() {

  const months = ["January","February","March","April","May","June","July",
  "August", "September", "October", "November", "December"]
  
  const [index, setMonth] = useState(0)
  const [year_index, setYear] = useState(0)

  const [checkIn, setDateIn] = useState("")
  const [checkOut, setDateOut] = useState("")
  
  console.log("Date in " + checkIn)
  
  console.log("Date out " + checkOut)

  let num = 0;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    
  const date = new Date();
  //console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())
  
  let month_days = new Date(date.getFullYear(), date.getMonth() + index + 1, 0).getDate()
  const last_month_days = new Date(date.getFullYear() + year_index, date.getMonth() + index, 0).getDate()
  const first_month_day = new Date(date.getFullYear() + year_index, date.getMonth() + index, 0).getDay()
  const last_month_day = new Date(date.getFullYear() + year_index, date.getMonth() + index + 1, 0).getDay()
  const current_year = new Date().getFullYear() + year_index;

  let day_index = first_month_day
  let day = 1;
  let total_days  = 1
  const month_index = new Date(date.getFullYear() + year_index, date.getMonth()).getMonth()

  const month = month_index + index
  //console.log("month " + month)

  return (
    <div id = "cld" className = "chalendar" style = {{display:"none"}}>
      <div className="chalendar-header">

        <button onClick={() => {
          if (month_index + index > 0)
            setMonth(index - 1)
          else {
            setMonth(months.length - month_index - 1)
            setYear(year_index - 1)
          }
        }}>Left</button>

        {months[month_index + index]}

        <button onClick={() => {
          if (month_index + index < months.length - 1)
            setMonth(index + 1)
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
            //day++
            total_days++
              return <div className='chalendar-content__day chalendar-content__day--faded'>{last_month_days - day_index}</div> 
          })
        }
        {
          Array.from(Array(month_days)).map((item, index) => {
            //day++
            total_days++
            //console.log(day);
            return <div onClick={() => {
              if(!checkIn)    
                setDateIn(index + 1 + "-" + month_index + "-" + current_year)
              
              else {
                const selected_date = index + 1 + "-" + month_index + "-" + current_year
                if(selected_date > checkIn)
                  setDateOut(index + 1 + "-" + month_index + "-" + current_year)
                
                else
                  setDateIn(index + 1 + "-" + month_index + "-" + current_year)
              }
              
                }} className='chalendar-content__day chalendar-content__day--clear'>{index + 1}</div> 
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
