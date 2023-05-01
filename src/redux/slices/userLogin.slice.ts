import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useSelector } from 'react-redux';

interface userStateRedux{
    id: string
    email: string;
    name: string;
    avatar: string
}

const initialiceUcerSlice: userStateRedux = {
    id: '',
    email:'',
    name: '',
    avatar: ''
}

const userLoginSlice = createSlice({
    name: "userLoginSlice",
    initialState:initialiceUcerSlice,
    reducers:{
        setUserLogin(state, action){
            return action.payload
        }
    }
})

const selectuserLogin = (state:RootState)=> state;

export const {setUserLogin} = userLoginSlice.actions;
export const useUserSlice = ()=>{ return useSelector(selectuserLogin)}
export default userLoginSlice.reducer