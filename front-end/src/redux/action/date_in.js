// export default function setCheckIn (payload) {
//     return {
//         type: "checkIn",
//         payload
//     }
// }
// import { createReducer, createSlice } from "@reduxjs/toolkit";

// export const dateSlice = createSlice(
//     {
//         name: "date",
//         initialState: {
//             checkIn: '',
//             checkOut:''
//         },
//         reducers: {
//             setCheckIn: (state) => {
//                 state.checkIn = action.payload;
//             },
            
//             setCheckOut: (state) => {
//                 state.checkOut = action.payload;
//             }
//         }
//     }
// )

// export const { setCheckIn, setCheckOut } = dateSlice.actions
// export default dateSlice.reducer