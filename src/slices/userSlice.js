import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    user:null,
    searchedUser:[]
}

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        },
        setSearchUser(state,value){
            state.searchedUser = value.payload
            console.log("searched user in slice ",value.payload)
        }
    }
})

export const {setUser,setLoading,setSearchUser} = userSlice.actions
export default userSlice.reducer