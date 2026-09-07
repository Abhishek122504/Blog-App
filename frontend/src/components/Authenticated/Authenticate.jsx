import {useSelector} from 'react-redux'
import { Navigate } from 'react-router';

export const Authenticate = ({children})=>{
    const {authLoading, isLoggedIn} = useSelector((state)=>state.auth);
    if(authLoading){
        return "Loading...";
    }
    if(!isLoggedIn){
        return <Navigate to='/auth/login' replace/>
    }

    return children;
}