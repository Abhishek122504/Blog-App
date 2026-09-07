import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    user : null,
    isLoggedIn : false,
    authLoading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        login : (state, action)=>{
            state.user = action.payload.username,
            state.isLoggedIn = true
        },
        logout : (state)=>{
            state.user = null,
            state.isLoggedIn = false
        },
        setAuthLoading : (state, action)=>{
            state.authLoading = action.payload
        }
    }
})

export const {login, logout, setAuthLoading} = authSlice.actions

export default authSlice.reducer