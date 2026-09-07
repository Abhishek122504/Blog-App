import { useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { login, setAuthLoading } from './authSlice';
import axios from 'axios';


const AuthInitializer = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await axios.get('/api/v1/users/fetchUser');
                dispatch(login(userData.data.user))
            }
            catch (error) {
                console.log("Error While fetching current user: ", error.response);
            }
            finally{
                dispatch(setAuthLoading(false))
            }
        }
        fetchUser();
    }, [dispatch]);


    return null;
}

export default AuthInitializer
