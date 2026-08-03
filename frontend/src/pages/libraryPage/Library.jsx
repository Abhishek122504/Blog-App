import React from 'react'
import './library.css'

const Library = () => {
    return (
        <div className='lib-container w-full flex justify-center items-center'>
            <div className="lib-wrap w-[50vw] h-[70vh] py-2 px-2 flex flex-col">
                <div className='lib-head flex flex-col items-start justify-between gap-7'>
                    <div className="w-full flex justify-between">
                        <h2 className='text-5xl'>Your Library</h2>
                        <button className='lib-btn h-10 bg-black-twhite px-4 rounded-[10px] text-white cursor-pointer'>New List</button>
                    </div>
                    <div className="lib-tabs flex gap-8">
                        <span className='lib-tab active-tab'>Your Lists</span>
                        <span className='lib-tab'>Liked posts</span>
                        <span className='lib-tab'>History</span>
                        <span className='lib-tab'>Responses</span>
                    </div>
                </div>
                <div className='tab-content w-full h-full text-2xl flex items-center justify-center light-text'>You don't have anything yet :(</div>
            </div>
        </div>
    )
}

export default Library
