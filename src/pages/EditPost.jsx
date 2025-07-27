import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import appwriteServices from '../appwrite/config'
import {Container, PostForm} from '../components/index'

function EditPost() {
    const {slug} = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        appwriteServices.getPost(slug)
            .then((post) => {
                if(post) setPost(post)
                else navigate('/')
            })
            .finally(() => setLoading(false))
    }, [slug, navigate])

    if(loading)
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <h1 className='text-2xl font-bold'>
                    Loading...
                </h1>
            </div>
        )
        
        console.log(post)

  return (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  )
}

export default EditPost