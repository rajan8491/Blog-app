import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router'

import store from './store/store.js'

import {AuthLayout} from './components/index.js'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/login',
                element: (
                    <AuthLayout isAuthRequired={false}> 
                        <Login/>
                    </AuthLayout>
                )
            },
            {
                path: '/signup',
                element: (
                    <AuthLayout isAuthRequired={false}> 
                        <Signup/>
                    </AuthLayout>
                )
            },
            {
                path: '/all-posts',
                element: (
                    <AuthLayout isAuthRequired={true}> 
                        <AllPosts/>
                    </AuthLayout>
                )
            },
            {
                path: '/add-post',
                element: (
                    <AuthLayout isAuthRequired={true}> 
                        <AddPost/>
                    </AuthLayout>
                )
            },
            {
                path: '/edit-post/:slug',
                element: (
                    <AuthLayout isAuthRequired={true}> 
                        <EditPost/>
                    </AuthLayout>
                )
            },{
                path: '/post/:slug',
                element: (
                    <AuthLayout isAuthRequired={true}> 
                        <Post/>
                    </AuthLayout>
                )
            },
        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
