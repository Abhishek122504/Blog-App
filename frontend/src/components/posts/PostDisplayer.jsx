import React, { useState, useEffect, useRef } from 'react';
import Post from '../post/Post';
import axios from 'axios';
import "./postDisp.css";

const PostDisplayer = () => {
    const postPerPage = 5;
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observered = useRef(null);

    const addPosts = async () => {
        if (loading || !hasMore) {
            return;
        }

        try {
            setLoading(true);
            if(!hasMore) return;
            const data = await axios.get(
                `/api/v1/post/getAllPosts?page=${page}&limit=${postPerPage}`
            );
            setVisiblePosts((prev) => [
                ...prev,
                ...data.data.posts
            ]);
            setHasMore(data.hasMore);
            setPage((prev) => prev + 1);

        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        addPosts();
    }, []);

    useEffect(() => {
        if (loading || !hasMore) {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    console.log("Reached trigger. Fetching more posts...");
                    addPosts();
                }
            },
            {
                threshold: 0.5
            }
        );
        if (observered.current) {
            observer.observe(observered.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [visiblePosts, loading, hasMore]);


    return (
        <div className='posts-displayer h-full'>
            {
                visiblePosts.map((post, index) => {
                    const triggerIndex = visiblePosts.length - 2;
                    if (index === triggerIndex) {
                        return (
                            <div
                                key={post._id}
                                ref={observered}
                            >
                                <Post
                                    id={post._id}
                                    title={post.title}
                                    desc={post.desc}
                                    thumbnail={post.thumbnail}
                                    author={post.postedBy.username}
                                />
                            </div>
                        );
                    }
                    return (
                        <Post
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            desc={post.desc}
                            thumbnail={post.thumbnail}
                        />
                    );
                })
            }

            {
                loading && (
                    <p>Loading...</p>
                )
            }

            {
                !hasMore && visiblePosts.length > 0 && (
                    <div className='w-full py-2 flex items-center justify-center rounded-sm bg-indigo-100'>You reached the core</div>
                )
            }

        </div>
    );
}

export default PostDisplayer;