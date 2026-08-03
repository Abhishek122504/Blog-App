import React from 'react'
import './profile.css'


const Profile = () => {
    return (
        <div className='prof-container w-full flex justify-center'>
            <div className="prof-wrap w-[70vw] h-[80vh] mt-10 gap-18 flex flex-col">
                <div className="prof-info flex flex-col relative gap-10">
                    <div className="prof-thumbnail rounded-t-xl w-full h-[20vh] overflow-hidden">
                        <img className='w-full' src="https://images.unsplash.com/photo-1734700725722-7f81d62f33b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className='absolute top-24 flex items-center gap-5 px-5'>
                        <img className='w-20 rounded-[50px] border-2 border-black' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                        <h2 className='text-xl'>Example Name</h2>
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
