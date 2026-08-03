import React from 'react'
import './createpost.css'

const Createpost = () => {
  return (
    <div className='w-full bg-amber-100 px-10 py-10 flex flex-col gap-10'>
      <div className="title border border-b-emerald-900 rounded-sm">
        <input className='crw-inp' type="text" placeholder='Title'/>
      </div>
      <div className="blog-desc max-h-[30vh] border border-b-emerald-900 overflow-y-auto rounded-sm">
        {/* <input className='crw-inp' type="text" placeholder="Description"/> */}
        <p className='wysiwyg crw-inp' contentEditable></p>
      </div>
      <div className="thumbnail">
        <label htmlFor="blog_th">Thumbnail: </label>
        <input className='crw-inp border rounded-sm cursor-pointer' type="file" name="blog_th" id="blog_th" />
      </div>
      <div className="submit-btn">
        <button className='h-10 bg-black-twhite px-4 rounded-[10px] text-white cursor-pointer'>Submit</button>
      </div>
    </div>
  )
}

export default Createpost
