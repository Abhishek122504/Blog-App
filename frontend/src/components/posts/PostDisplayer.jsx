import React, { useState, useEffect, useRef } from 'react'
import Post from '../post/Post'
import "./postDisp.css"

const posts = [
    {
        id: 1,
        title: "The Silence of Concrete",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum error facilis culpa rerum omnis eos veritatis consequuntur. Assumenda, deserunt? Delectus esse laborum ab possimus minima ipsum deserunt quam, aut laboriosam molestiae expedita amet provident cumque et earum voluptatibus ea exercitationem.",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        title: "How to upload posts to 'The Quiet Curator'",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 4,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 5,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 6,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 7,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 8,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 9,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 10,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 11,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 12,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 13,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 14,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 15,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 16,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 17,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 18,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 19,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 20,
        title: "Hhahahhaha",
        desc: "Sample Text",
        thumbnail: "https://images.unsplash.com/photo-1753695115211-12629cb8d4e9?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

const PostDisplayer = () => {
    const page = 1;
    const postPerPage = 5;
    const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, postPerPage));
    const triggerIndex = visiblePosts.length - 2;
    const observered = useRef(null);

    const addPosts = async()=>{
        
    }

    useEffect(()=>{
        addPosts();
    }, [])

    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            const entry = entries[0];

            if(entry.isIntersecting){
                console.log("Adding more posts...")
                setVisiblePosts((prev)=>{
                    if(prev.length >= posts.length){
                        observer.disconnect()
                        return prev;
                    }

                    const nextSet = posts.slice(0, prev.length+postPerPage); // taking next set of posts from 0 to new index every time

                    return nextSet
                })
            }
        },{
            threshold: 0.5
        })

        if(observered.current){
            observer.observe(observered.current);
        }
        return ()=> observer.disconnect()
    }, [visiblePosts])

    return (
        <div className='posts-displayer h-full'>
            {
                visiblePosts.map((post, index) => {

                    if(index===triggerIndex){
                        return <div ref={observered}> 
                        <Post
                        ref={observered}
                        id={post.id}
                        title={post.title}
                        desc={post.desc}
                        thumbnail={post.thumbnail}
                    />
                    </div>
                    }
                    return <Post
                        id={post.id}
                        title={post.title}
                        desc={post.desc}
                        thumbnail={post.thumbnail}
                    />
                })
            }
        </div>
    )
}

export default PostDisplayer
