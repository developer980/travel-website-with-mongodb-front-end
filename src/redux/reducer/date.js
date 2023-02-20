import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice(
    {
        name: "date",
        initialState: {
            checkIn: '',
            checkOut: '',
            token: '',
            favourites:[],
            data: {
                
            },
            guests: {
                adults: 2,
                children: 1,
                rooms:1
            },
            email:""
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

            setGuests(state, action) {
                state.guests = {
                    children:action.payload.children,
                    adults:action.payload.adults,
                    rooms:action.payload.rooms
                }
            }
            // setFavourites: (state, action) => {
            //     state.favourites = action.payload
            //     console.log(state.favourites)
            // }
        }
    }
)

export const { setCheckIn, setCheckOut, setToken, getEmail, setGuests } = dateSlice.actions
export default dateSlice.reducer