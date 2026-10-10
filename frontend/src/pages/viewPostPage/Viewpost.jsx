import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { useParams } from 'react-router'
import { useNavigate } from 'react-router';
import { Oval } from 'react-loader-spinner'
import axios from 'axios';

const Viewpost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  }

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const postData = await axios.get(`/api/v1/post/getPost/${id}`);
        console.log(postData.data.post)
        setPost(postData.data.post)
      }
      catch (error) {
        console.log("error from viewpost: ", error);
        console.log(post)
      }
    }

    fetchPost()
    setLoading(false);
  }, [id])

  return (
    <div className="w-full">
        <div className="post_wrap w-full py-10">

          <div className="title w-[70vw] mx-auto mb-5">
            <span
              className="w-8.5 h-8.5 flex justify-center items-center bg-gray-200 rounded-sm cursor-pointer mb-2"
              onClick={handlePrev}
            >
              <FaAngleLeft />
            </span>

            <h3 className="text-2xl font-bold">
              {post?.title?.toUpperCase()}
            </h3>
            <div className="author flex items-center gap-2 mt-2">
              <img src={post?.postedBy?.avatar} className='w-6 h-6 rounded-[50%]' alt="" />
              <span>
                {post?.postedBy?.username}, {new Date(post?.createdAt).toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}</span>
            </div>
            <div className="author_action"></div>
          </div>

          <div className="thumbnail w-[70vw] mx-auto">
            <img
              src={post?.thumbnail}
              className="w-full"
              alt=""
            />
          </div>

          <div className="post_info w-[70vw] mx-auto my-4">
            <div className="desc">
              {post?.desc}
            </div>
          </div>

        </div>
    </div>
  )
}

export default Viewpost
