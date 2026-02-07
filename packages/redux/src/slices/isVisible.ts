import { createSlice } from "@reduxjs/toolkit";

const isVisibleSlice = createSlice({
    name:"isVisible",
    initialState: {
        value: false
    },
    reducers: {
        toggle: state =>{
            state.value = !state.value
        }
    }
})

export const { toggle } = isVisibleSlice.actions;
export default isVisibleSlice.reducer;