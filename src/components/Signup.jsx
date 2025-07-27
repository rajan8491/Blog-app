import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router'
import {Button, Input, Logo} from './index'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("");

    const signup = async (data) => {
        try{
            const userData = await authService.createAccount(data);
            console.log(userData)
            // console.log(data);

            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (err) {
            setError(err.message)
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
                Sign up to create new account
            </h2>
            <p>
                Already have an account  
                <Link to="/login"
                className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign in
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(signup)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label = "Full Name:"
                    type = "text"
                    placeholder = "Enter your full name"
                    {...register("name", {
                        required: true
                    })}
                    />
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
                    > Create Account </Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Signup