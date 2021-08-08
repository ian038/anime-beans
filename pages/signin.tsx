import React from 'react'
import Link from 'next/link'

const Signin = () => {
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Log In</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                    />

                    <button type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
                    >Log In</button>
                    <div className="flex flex-col space-y-5 mt-2">
                        <span className="flex items-center justify-center space-x-2">
                            <span className="h-px bg-gray-400 w-24"></span>
                            <span className="font-normal text-gray-500">or sign in with</span>
                            <span className="h-px bg-gray-400 w-24"></span>
                        </span>
                        {/* INSERT SOCIAL LINKS HERE: GITHUB & GOOGLE WIP */}
                    </div>
                </div>
                <div className="text-grey-dark mt-6">
                    Don&apos;t have an account?
                    <Link href='/signup'>
                        <a className="no-underline border-b border-blue text-blue">
                            &nbsp;Sign Up
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signin