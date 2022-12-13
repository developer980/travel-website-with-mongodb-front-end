import dateSlice from "./reducer/date";
import {configureStore} from "@reduxjs/toolkit"

const store =  configureStore({
    reducer: {
        date: dateSlice
    }
})

export default store