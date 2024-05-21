import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connectedChef: null,

}

const chefSlice = createSlice({
    name: "chef",
    initialState,
    reducers:{
        setConnectedChef: (state, action) =>{
            state.connectedChef = action.payload
        },
        setUnConnectedChef: (state) =>{
            state.connectedChef = null;
        }
    }
})

export const {setConnectedChef, setUnConnectedChef} = chefSlice.actions;
export default chefSlice.reducer;