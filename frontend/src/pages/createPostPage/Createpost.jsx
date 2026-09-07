import React, { useRef, useState } from 'react'
import axios from 'axios'; 
import ImageCropper from './ImageCropper'
import './createpost.css'

const Createpost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [thumb, setThumb] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleDesc = (e) => {
    setDesc(e.target.value);
  }

  const handleSubmit = async () => {

    if(!title || !desc || !thumb) return;
    if(submitting) return;

    setSubmitting(true);

    try{
      const f_data = new FormData();
      f_data.append('title', title);
      f_data.append('desc', desc);
      f_data.append('thumbnail', thumb);

      const data = await axios.post('/api/v1/post/uploadPost', f_data);
      console.log(data);
      setTitle('');
      setDesc('');
      setThumb('');

      fileInputRef.current.value = '';
    }
    catch(error){
      console.log("Error From createpost.jsx: ", error);
    }
    finally{
      setSubmitting(false);
    }
  }
  return (
    <div className='w-full bg-amber-100 px-10 py-10 flex flex-col gap-10'>
      <div className="title border border-b-emerald-900 rounded-sm">
        <input className='crw-inp' onChange={handleTitle} required value={title} type="text" placeholder='Title' />
      </div>
      <div className="blog-desc max-h-[30vh] border border-b-emerald-900 overflow-y-auto rounded-sm">
        <textarea className='crw-inp' onChange={handleDesc} required value={desc} type='text' placeholder='Description' />
      </div>
      <div className="thumbnail">
        <label htmlFor="blog_th">Thumbnail: </label>
        <ImageCropper setBlob={setThumb}/>
      </div>
      <div className="submit-btn">
        <button onClick={handleSubmit} className={`h-10 ${ submitting ? 'bg-gray-900': 'bg-black-twhite'} px-4 rounded-[10px] text-white cursor-pointer`}>Submit</button>
      </div>
    </div>
  )
}

export default Createpost
