import React, { useEffect, useState } from 'react'
import appwriteServices from '../appwrite/config';
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(async () => {
        appwriteServices.getAllPost().then((data) => {
            setPosts(posts)
        }).catch((err) => {
            setError(err.message)
        }).finally(() => setLoading(false))
        
    }, [])

    if(loading)
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <h1 className='text-2xl font-bold'>
                    Loading...
                </h1>
            </div>
        )

    if(posts.length===0)
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <h1 className='text-2xl font-bold'>
                    {error ? "Please login to read posts" : "No post available"}
                </h1>
            </div>
        )
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home