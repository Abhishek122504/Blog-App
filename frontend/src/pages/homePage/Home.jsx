import React from "react";
import {Link}  from "react-router";
import "./home.css"

const Home = () => {
    return <section className="w-full h-full my-3 flex items-center">
        <div className="featured w-[85vw] h-[70vh] px-5 mx-auto my-12.5 flex items-center justify-between gap-10">
            <div className="left-section w-[90%] h-full flex flex-col justify-center gap-5 px-2.5">
                <h1 className="text-6xl">
                    Share your voice. <br /> Inspire the world.
                </h1>
                <p className="font-GoogleSans text-color-light">
                    A space to read thoughtful stories, share your ideas, and connect with curious minds.
                </p>
                <div className="btn-actions text-white flex items-center gap-4">
                <Link to="/home"> <button className="py-2 px-5 bg-black rounded-4xl cursor-pointer">Start reading </button> </Link>
                <Link to="/home">  <button className="py-2 px-5 bg-black rounded-4xl cursor-pointer"> Write a story </button> </Link>
                </div>
            </div>
            <div className="right-section rounded-lg h-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1686058542860-0ef12166f3bb?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" alt="Thumbnail" />
            </div>
        </div>
    </section>
}

export default Home;
