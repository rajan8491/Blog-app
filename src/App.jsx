import { useState, useEffect } from 'react';
import conf from './conf/conf';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import {Header, Footer} from './components/index';
import { Outlet } from 'react-router';

function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if(userData){
                  dispatch(login({userData}))
                }
                else dispatch(logout())
            })
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false))
    }, [])
  
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
      <div className = 'min-h-screen flex flex-col bg-gray-400'>
          <Header/>
          <main className='flex-grow'>
            <Outlet/>
          </main>
          <Footer/>
      </div>
    </>
  )
}

export default App
