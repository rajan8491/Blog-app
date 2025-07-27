import React from 'react'
import {useDispatch} from 'react-redux'
import authservice from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        const data = await authservice.logoutUser()
        dispatch(logout())
        navigate('/login')
    }
  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn