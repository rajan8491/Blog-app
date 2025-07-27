import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router'
import {useSelector} from 'react-redux'
import appwriteServices from '../appwrite/config';
import {Button, Container} from '../components/index'
import parse from 'html-react-parser'

function Post() {
    const {slug} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        appwriteServices.getPost(slug)
            .then((post) => {
                if(post) setPost(post)
                else navigate('/')
            })
            .finally(() => setLoading(false))
    }, [slug, navigate])

    let imageFile    
    if(post){
        imageFile = appwriteServices.getFileView(post.featuredImage)
    }

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
                src={imageFile}
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
                        <Button bgColor='bg-red-500' onClick={() => setShowConfirm(true)}>
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

            {showConfirm && (
  <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center">
      <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p className="text-gray-700 mb-6">Are you sure you want to delete this post?</p>
      
      <div className="flex justify-center gap-4">
        <button 
          onClick={deletePost}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Yes, Delete
        </button>
        <button 
          onClick={() => setShowConfirm(false)}
          className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

        </Container>
    </div>
    

  )
}

export default Post



//flex items-center justify-center
//rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center
