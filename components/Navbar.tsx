import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'
import { useRouter } from "next/router"

const Navbar: React.FC<{}> = () => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const isActive: (pathname: string) => object = pathname => {
        if (router.pathname === pathname) return { color: '#48bb78' }
    }

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async () => checkUser()
        )
        checkUser()
        return () => {
            authListener?.unsubscribe()
        }
    }, [])

    const checkUser = () => {
        const user = supabase.auth.user()
        setUser(user)
    }

    let left = (
        <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
                <a style={isActive('/')} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                    <span className="mr-6 cursor-pointer">Home</span>
                </a>
            </Link>
            <Link href="/profile">
                <a style={isActive('/profile')} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                    <span className="mr-6 cursor-pointer">Profile</span>
                </a>
            </Link>
        </div>
    )

    let right = (
        <div className="hidden md:flex items-center space-x-3">
            <Link href='/login'>
                <a className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-300 hover:text-white transition duration-300">
                    Log In
                </a>
            </Link>
            <Link href='/signup'>
                <a className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-300 transition duration-300">
                    Sign Up
                </a>
            </Link>
        </div>
    )

    if (user) {
        left = (
            <div className="hidden md:flex items-center space-x-1">
                <Link href="/">
                    <a style={isActive('/')} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                        <span className="mr-6 cursor-pointer">Home</span>
                    </a>
                </Link>
                <Link href="/profile">
                    <a style={isActive('/profile')} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                        <span className="mr-6 cursor-pointer">Profile</span>
                    </a>
                </Link>
                <Link href="/create">
                    <a style={isActive('/create')} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                        <span className="mr-6 cursor-pointer">Create Post</span>
                    </a>
                </Link>
            </div>
        )
        right = (
            <div className="hidden md:flex items-center space-x-3">
                <button className='border-none'>
                    <a className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-300 transition duration-300">
                        Log Out
                    </a>
                </button>
            </div>
        )
    }

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        {left}
                    </div>
                    {right}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
