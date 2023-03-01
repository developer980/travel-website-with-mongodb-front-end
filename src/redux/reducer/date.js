import { createSlice } from "@reduxjs/toolkit";

const date = new Date()

const day = new Date(date.getFullYear(), date.getMonth(), 1).getDate()
const month = new Date(date.getFullYear(), date.getMonth()+1).getMonth()
const year = new Date().getFullYear()

console.log(day + "." + month + "." + year)

export const dateSlice = createSlice(
    {
        name: "date",
        initialState: {
            checkIn: day + "." + month + "." + year,
            checkOut: day+1 + "." + month + "." + year,
            token: '',
            favourites:[],
            data: {
                
            },
            guests: {
                adults: 2,
                children: 1,
                rooms:1
            },
            email: "",
            displayMode: {
                mode: "",
                display:0
            }
        },
        reducers: {
            setCheckIn: (state, action) => {
                console.log(action.payload)
                state.checkIn = action.payload;
                console.log(state.checkIn)
            },
            
            setCheckOut: (state, action) => {
                console.log(action.payload)
                state.checkOut = action.payload;
                console.log(state.checkOut)
            },

            setToken: (state, action) => {
                state.token = action.payload
            },

            getEmail: (state, action) => {
                console.log(action.payload)
                state.email = action.payload
            },

            setGuests:(state, action) => {
                state.guests = {
                    children:action.payload.children,
                    adults:action.payload.adults,
                    rooms:action.payload.rooms
                }
            },

            setMode: (state, action) => {
                console.log("action" + action.payload)
                state.displayMode = {
                    mode: action.payload.mode,
                    display:action.payload.display
                }
            },

            // setCheckIn: (state, action) => {
            //     console.log("action" + action.payload)
            //     state.displayMode = {
            //         mode: action.payload.mode,
            //         display:action.payload.display
            //     }
            // }
            // setFavourites: (state, action) => {
            //     state.favourites = action.payload
            //     console.log(state.favourites)
            // }
        }
    }
)

export const { setCheckIn, setCheckOut, setToken, getEmail, setGuests, setMode } = dateSlice.actions
export default dateSlice.reducer