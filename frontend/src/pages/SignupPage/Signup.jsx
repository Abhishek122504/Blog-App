import React, { useState } from 'react'
import { BiKey, BiUser } from 'react-icons/bi'
import { IoMdEye, IoIosEyeOff  } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const icon_size = 30;
    const icon_field_gap = 4;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const handleUser = (e)=>{
        setUsername(e.target.value);
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePass = (e)=>{
        setPassword(e.target.value);
    }
    const toggleView = ()=>{
        setVisible((visible)=> !visible)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const data = await axios.post("/api/v1/users/register", {
                username : username,
                email : email,
                password : password
            })
            console.log(data);
            
        }
        catch(error){
            console.log("Error in signup.jsx: ", error.response);
        }
    }

    return (
        <div className='signup w-full h-screen flex items-center justify-center bg-dark'>
            <div className='form-wrap w-[70vw] h-[90vh] flex items-center bg-light rounded-[5px] overflow-hidden'>
                <div className='img-banner w-[40%] h-full overflow-hidden'></div>
                <div className="signup-form w-[60%] flex items-center justify-center h-full py-7">
                    <form className='flex flex-col p-5 gap-5 w-[60%] items-star' onSubmit={handleSubmit}>
                        <h2 className='text-3xl'>Sign up</h2>
                        <div className={`username w-full flex items-center gap-${icon_field_gap} border-b py-2 border-white`}>
                            <BiUser size={icon_size} />
                            <input onChange={handleUser} value={username} type="text" id='username' className='w-full outline-none' placeholder='username' />
                        </div>
                        <div className={`email w-full flex items-center gap-${icon_field_gap} border-b py-2 border-white`}>
                            <MdAlternateEmail size={icon_size} />
                            <input onChange={handleEmail} value={email} type="text" id='email' className='w-full outline-none' placeholder='email' />
                        </div>
                        <div className={`password w-full flex items-center gap-${icon_field_gap} border-b py-2 border-white`}>
                            <BiKey size={icon_size} />
                            <input onChange={handlePass} value={password} type={`${visible ? 'text' : 'password'}`} id='password' placeholder='password' className='w-full outline-none '/>
                            { visible ? <IoIosEyeOff onClick={toggleView} size={icon_size} /> :  <IoMdEye onClick={toggleView} size={icon_size}/>}
                        </div>
                        <p className='text-[14px]'>Already have an account? Login <Link to='/auth/login' className='text-blue-700 underline'> here</Link></p>
                        <button className='bg-black-twhite py-2 px-4 rounded-[5px] cursor-pointer'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
