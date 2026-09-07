import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../../components/Navbar/Navbar'

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default HomeLayout
