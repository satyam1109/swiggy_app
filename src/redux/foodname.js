import { createSlice } from "@reduxjs/toolkit";

const foodname = createSlice({
    name : "food",
    initialState:{
        name:"",
    },
    reducers:{
        setName : (state,action)=>{
            state.name = action.payload;
        },
    },
});

export const {setName} = foodname.actions;
export default foodname.reducer;