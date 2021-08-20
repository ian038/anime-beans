import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import { useAuth } from '../auth/AuthContext'

const Navbar: React.FC<{}> = () => {
    const { user, signOut } = useAuth()
    const router = useRouter()
    const isActive: (pathname: string) => object = pathname => {
        if (router.pathname === pathname) return { color: '#48bb78' }
    }

    let left = (
        <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
                <a style={isActive('/')} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                    <span className="mr-6 cursor-pointer">Home</span>
                </a>
            </Link>
        </div>
    )

    let right = (
        <div className="hidden md:flex items-center space-x-3">
            <Link href='/auth'>
                <a className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
                    Log In/Sign Up
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
                <Link href="/reviews">
                    <a style={isActive('/reviews')} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                        <span className="mr-6 cursor-pointer">Reviews</span>
                    </a>
                </Link>
                <Link href="/recaps">
                    <a style={isActive('/recaps')} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                        <span className="mr-6 cursor-pointer">Recaps</span>
                    </a>
                </Link>
            </div>
        )
        right = (
            <div className="hidden md:flex items-center space-x-3">
                <button className='border-none' onClick={signOut}>
                    <a className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-300 transition duration-300">
                        Log Out
                    </a>
                </button>
            </div>
        )
    }

    return (
        <nav className="bg-white shadow-lg border-b-4 border-green-500">
            <div className="max-w-8xl mx-auto">
                <div className="flex justify-between">
                    <div className="flex space-x-8">
                        <div className="flex items-center py-4 px-2">
                            <span className="font-semibold text-gray-500 text-lg">AnimeBeans</span>
                        </div>
                        {left}
                    </div>
                    {right}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
