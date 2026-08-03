import {useSelector} from 'react-redux'
import { Navigate } from 'react-router';

export const Authenticate = ({children})=>{
    const {isLoggedIn} = useSelector((state)=>state.auth);
    if(!isLoggedIn){
        return <Navigate to='/auth/login' replace/>
    }

    return children;
}