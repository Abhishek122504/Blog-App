import React from 'react'
import './main.css'
import PostDisplayer from '../../components/posts/PostDisplayer'

const Main = () => {
  return (
    <div className='w-full h-[85vh] px-5 overflow-y-scroll'>
        <div className="tabs text-light py-6 sticky top-0 bg-white">
            <span className='tabs_el mr-5'>For you</span>
            <span className='tabs_el'>Featured</span>
        </div>
        <PostDisplayer/>
    </div>
  )
}

export default Main
