import React from "react";
import featuredImage from "../../assets/FeaturedPostImage.png"
import { BiSolidLike  } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import "./post.css"

const Post = ({ id, title, desc, thumbnail }) => {
    return (
        <div key={id} className="post-card w-[65vw] py-3 px-5 my-8 flex flex-col gap-3">
            <span className="user_info flex items-center gap-2">
                <img className="user_pic" src="https://images.unsplash.com/profile-1743420226636-efaa285e9f95image?w=150&dpr=1&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" alt="hello" />
                <p className="user_name">Samsung Technologies</p>
            </span>
            <div className="post_info flex items-center justify-between cursor-pointer">
                <div className="left_post_info w-[70%]">
                    <h2 className="post_title">{title}</h2>
                    <p className="post_desc text-light">{desc.length > 80 ? desc.substr(0, 80) + "..." : desc}</p>
                </div>
                <div className="right_post_info w-50 overflow-hidden">
                    <img className="w-full object-cover" src={thumbnail} alt="" />
                </div>
            </div>
            <div className="post_actions flex items-center gap-4">
                <span className="flex items-center gap-1">
                    <BiSolidLike  size={18}/>
                    <p className="text-sm">1.2k</p>
                </span>
                <span className="flex items-center gap-1">
                    <IoMdShare size={18}/>
                    <p className="text-sm">852</p>
                </span>
            </div>
            <hr className="text-gray-200"/>
        </div>
    )
}

export default Post;