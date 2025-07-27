import React, { useEffect, useState } from 'react'
import appwriteServices from '../appwrite/config';
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    //const [error, setError] = useState(null)

    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteServices.getAllPost().then((posts) => {
            if(posts) {
                setPosts(posts.documents)
            }
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

    if(!authStatus)
        return (
            <div className='w-full py-8 mt-4 flex justify-center items-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold'>
                        Please login to read posts
                    </h1>
                </div>
            </div>
        )

    if(posts.length === 0)
        return (
            <div className='w-full py-8 mt-4 flex justify-center items-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold'>
                        No post available
                    </h1>
                </div>
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