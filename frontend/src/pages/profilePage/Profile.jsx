import React from 'react'
import { useSelector } from "react-redux";
import { GoPencil } from "react-icons/go";
import './profile.css'


const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className='prof-container w-full flex justify-center'>
            <div className="prof-wrap w-[70vw] h-[80vh] mt-10 gap-18 flex flex-col">
                <div className="prof-info flex flex-col gap-2">
                    <div className="prof-thumbnail rounded-t-xl w-full h-[20vh] relative overflow-hidden">
                        <img className='w-full' src="https://images.unsplash.com/photo-1734700725722-7f81d62f33b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <span className="w-10 h-10 bg-white rounded-full absolute right-5 top-3 flex items-center justify-center cursor-pointer">
                            <GoPencil size={20}/>
                        </span>
                    </div>
                    <div className='flex items-center gap-5 px-5'>
                        <img className='w-14 rounded-[50px] border-2 border-black' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                        <h2 className='text-xl'>{user}</h2>
                    </div>
                </div>
                <div className="prof-tabs border-bottom flex gap-5 px-5">
                    <span className='prof-tab active-tab'>Posts</span>
                    <span className='prof-tab'>Comments</span>
                </div>
                <div className='tab-content w-full h-full text-2xl flex items-center justify-center light-text'>You don't have anything yet :(</div>
            </div>
        </div>
    )
}

export default Profile
