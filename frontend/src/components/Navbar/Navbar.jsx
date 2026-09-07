import React from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import "./navbar.css";
import { setAuthLoading } from "../../features/auth/authSlice";

const Navbar = () => {

    const {isLoggedIn} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async ()=>{
        try{
            await axios.post('/api/v1/users/logout');
            dispatch(logout());
            dispatch(setAuthLoading(false));
            navigate('/auth/login');
        }
        catch(error){
            console.log("Error from Navbar.jsx: ", error.response);
        }
    }

    const handleLogin = ()=>{
        navigate('/auth/login');
    }

    return <nav className="w-full sticky top-0 z-20 bg-white customnav font-GoogleSans ">
        <div className="wrap-nav flex items-center justify-between px-5 py-4">
            <div className="logo-title ml-3">
                <h1 className="text-2xl ">The Quiet Curator</h1>
            </div>
            <div className="nav-actions flex items-center gap-10">
                <ul className="flex items-center gap-8">
                    <li><a href="#">Explore</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Stories</a></li>
                    <li><a href="#">Categories</a></li>
                </ul>
                {
                    isLoggedIn ? 
                    <button onClick={handleLogOut} className="py-1 px-3 bg-dodgerBlue text-white cursor-pointer">Logout</button> :
                    <button onClick={handleLogin} className="py-1 px-3 bg-dodgerBlue text-white cursor-pointer">Login</button>

                }
            </div>
        </div>
    </nav>
}

export default Navbar;

