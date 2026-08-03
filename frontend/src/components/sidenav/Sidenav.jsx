import React, { useState } from 'react'
import "./sidenav.css"
import { IoHome } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router';
import { HiOutlineUsers } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { FaNotesMedical } from "react-icons/fa6";

const icon_size = 23;

const Sidenav = () => {
    const [currentPage, setCurrentPage] = useState("main");

    return (
        <div className='w-full h-full py-8 px-1 sidenav'>
            <div className="wrap-sidenav flex flex-col gap-10">
                <ul className='flex flex-col justify-start gap-2'>
                    <Link to="/home" onClick={()=>setCurrentPage('main')}>
                        <li className={`sidenav_el ${currentPage == "main" ? 'active' : ''}`}>
                            <IoHome size={icon_size} />
                            <span className='text-[1.09rem]'>Home</span>
                        </li>
                    </Link>
                    <Link to="/library" onClick={()=>setCurrentPage('library')}>
                        <li className={`sidenav_el ${currentPage == "library" ? 'active' : ''}`}>
                            <IoBookmarksOutline size={icon_size} />
                            <span >Library</span>
                        </li>
                    </Link>
                    <Link to="/profile" onClick={()=>setCurrentPage('profile')}>
                        <li className={`sidenav_el ${currentPage == "profile" ? 'active' : ''}`}>
                            <FiUser size={icon_size} />
                            <span >Profile</span>
                        </li>
                    </Link>
                    <Link to="/post" onClick={()=>setCurrentPage('create')}>
                        <li className={`sidenav_el ${currentPage == "create" ? 'active' : ''}`}>
                            <FaNotesMedical size={icon_size} />
                            <span >Create</span>
                        </li>
                    </Link>

                </ul>
                <ul className='flex flex-col justify-start gap-2'>
                    <li className='sidenav_el'>
                        <HiOutlineUsers size={icon_size} />
                        <span>Following</span>
                    </li>
                    <li className='sidenav_el'>
                        <GoPlus size={icon_size} />
                        <span className='text-[0.9rem]'>Find writers and publications to follow.</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidenav
