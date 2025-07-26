import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router'
import {useSelect} from 'react-redux'
import appwriteServices from '../appwrite/config';
import {Button, Container} from '../components/index'
import {parse} from 'html-react-parser'

function Post() {
    const {slug} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const userData = useSelect((state) => state.auth.userData)

    const isAuthor = post && userData ? post.$id === userData.userId : false

    useEffect(async () => {
        const post = await appwriteServices.getPost(slug)
        if(post)
          setPost(post)
        else navigate('/')
        setLoading(false)
    }, [slug, navigate])

    const deletePost = async () => {
        const isDeleted = await appwriteServices.deletePost(slug)
        if(isDeleted){
            await appwriteServices.deleteFile(slug.featuredImage)
            navigate('/')
        }
    }

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
            <div className='w-full flex justify-center mb-4 relative border rounded-xl'>
                <img
                src={appwriteServices.getFilePreview(post.featuredImage)}
                alt={post.title}
                className='rounded-xl'
                />

                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${slug}`}>
                            <Button bgColor='bg-green-500' className='mr-3'>
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor='bg-red-500' onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>
                    {post.title}
                </h1>
            </div>
            <div className='browser-css'>
                {parse(post.content)}
            </div>
        </Container>
    </div>
  )
}

export default Post