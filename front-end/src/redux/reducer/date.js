import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice(
    {
        name: "date",
        initialState: {
            checkIn: '',
            checkOut: ''
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
            }
        }
    }
)

export const { setCheckIn, setCheckOut } = dateSlice.actions
export default dateSlice.reducer