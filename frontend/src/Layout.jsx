import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import Sidenav from "./components/sidenav/Sidenav"
import {Outlet} from "react-router-dom"
import './layout.css'

const Layout = () => {
    return (
        <div className="layout">
          <header className="navbar">
            <Navbar />
          </header>
    
          <aside className="sidebar">
            <Sidenav />
          </aside>
    
          <main className="content">
            <Outlet />
          </main>
        </div>
      );
}

export default Layout
