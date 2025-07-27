import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function AuthLayout({children, isAuthRequired = true}) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const status = useSelector((state) => state.auth.status)

    useEffect(() => {
        if(isAuthRequired && status !== true)
            navigate('/login')
        else if(!isAuthRequired && status === true)
            navigate('/')
        setLoading(false)
    })

    if(loading)
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <h1 className='text-2xl font-bold'>
                    Loading...
                </h1>
            </div>
        )

  return (
    <>
        {children}
    </>
  )
}

export default AuthLayout