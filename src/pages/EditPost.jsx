import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import appwriteServices from '../appwrite/config'
import {Container, PostForm} from '../components/index'

function EditPost() {
    const {slug} = useParams()
    const {post, setPost} = useState(null)
    const {loading, setLoading} = useState(true)
    const navigate = useNavigate()

    useEffect(async () => {
        const post = await appwriteServices.getPost(slug)
        if(post)
          setPost(post)
        else navigate('/')
        setLoading(false)
    }, [slug, navigate])

    if(loading)
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <h1 className='text-2xl font-bold'>
                    Loading...
                </h1>
            </div>
        )

  return (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  )
}

export default EditPost