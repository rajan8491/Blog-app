import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import RTE from '../RTE'
import appwriteServices from '../../appwrite/config'
import Select from '../Select'
import Button from '../Button'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register, handleSubmit, control, watch, setValue, getValues} = useForm()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)


    const submitForm = async (data) => {
        if(post){
            const imageId = data.image[0] ? await appwriteServices.uploadFile(data.image[0]) : null
            if(imageId) await appwriteServices.deleteFile(post.featuredImage)
            const updatedPost = await appwriteServices.updatePost(
                post.$id,
                {
                    ...data,
                    featuredImage: imageId ? imageId.$id : null
                }
            )

            if(updatedPost)
                navigate(`/post/${updatedPost.$id}`)

        }
        else{
            const imageId = await appwriteServices.uploadFile(data.image[0])
            const newPost = await appwriteServices.createPost({
                ...data,
                featuredImage: imageId.$id,
                userId: userData
            })
            if(newPost)
                navigate(`/post/${newPost.$id}`)
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')

        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true
                })
            }
        })
        return () => subscription.unsubscribe()
    },[watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submitForm)} className='flex flex-wrap'>
        <div className='w-2/3 px-2'>
            <Input
            label="Title:"
            type="text"
            placeholder='Title'
            {...register("title",{
                required: true
            })}
            />
            <Input
            label='Slug:'
            placeholder='Slug'
            {...register("slug", {
                required: true
            })}
            // onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value))}
            />
            <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            />
        </div>
        <div className='w-1/3 px-2'>
            <Input
            label="Featured Image:"
            type="file"
            className='mb-4'
            accecpt="image/png image/jpg image/gif"
            {...register("image", {
                required: true
            })}
            />
            {post && (
                <div className='w-full mb-4'>
                    <img
                    src={appwriteServices.getFilePreview(post.featuredImage
                    )}
                    alt={post.title}
                    className='rounded-lg'
                    />
                </div>
            )}
            <Select
            options={['active', 'inactive']}
            label='Status'
            className='mb-4'
            {...register("status", {
                required: true
            })}
            />
            <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className='w-full'
            >
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm



/*

setValue -> allows us to set field value programatically.  It re-renders when field is being watched

getValues -> gives form data without re-rendering. also you get data before submitting the form

watch -> It subscribes to the form field(s) and "watches" their values. Re-renders the component everytime when field get changed

we used here watch(callback) -> efficient because only run logic instead of rendering entire component 
arguments -> value, {name, type} 
value-> data object
name-> field getting changed 
type-> event type

note -> This is event-driven: you're asking RHF to observe all changes and run a function when something changes.

It's like adding an eventListener, and must be removed (i.e., unsubscribed).



*/