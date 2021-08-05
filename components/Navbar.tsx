import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'

const Navbar: React.FC<{}> = () => {
    const [user, setUser] = useState(null)

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
        console.log('SUPABASE USER', user)
        setUser(user)
    }

    return (
        <>
            <nav className="p-6 border-b border-gray-300">
                <Link href='/'>
                    <a><span className="mr-6 cursor-pointer">Home</span></a>
                </Link>
                {
                    user && (
                        <Link href="/create-post">
                            <a><span className="mr-6 cursor-pointer">Create Post</span></a>
                        </Link>
                    )
                }
                <Link href="/profile">
                    <a><span className="mr-6 cursor-pointer">Profile</span></a>
                </Link>
            </nav>
        </>
    )
}

export default Navbar