import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router'
import {Logo, Input, Button} from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/auth'
import {login as authLogin} from '../store/authSlice'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("");

    const login = async (data) => {
        try{
            const session = await authService.loginAccount(data)

            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (err) {
            setError(err)
        }
    } 

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Sign in to your account
            </h2>
            <p>
                Don't have any account 
                <Link to="/signup"
                className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Email:"
                    type='email'
                    placeholder="Enter your email"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email" 
                        }
                    })}
                    />
                    <Input
                    label = "Password:"
                    type = "password"
                    placeholder = "Enter your password"
                    {...register("password",{
                        required: true
                    })}
                    />
                    <Button
                    type="submit"
                    className='w-full'
                    >Sign in </Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Login

/*

register() returns an object which are necessary handlers required to track input

register("email") = {
    name="email",
    onChange=f,
    onBlur=f,
    ref=f
}

this is why spread syntax is used

<input {...register("email")} /> 
is same as
<input
    name="email"
    onChange={...}
    onBlur={...}
    ref={...}
/>

*/