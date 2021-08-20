import React, { useState } from 'react'
import { useFormFields } from '../utils'
import { useAuth } from '../auth/AuthContext'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { AuthFieldProps } from '../types'

const FORM_VALUES: AuthFieldProps = {
    email: '',
    password: ''
}

const Signup = () => {
    const { loading, signUp, signIn, signInWithGithub, signInWithGoogle, alert, setAlert } = useAuth()
    const [values, handleChange] = useFormFields<AuthFieldProps>(FORM_VALUES)
    const [isSignIn, setIsSignIn] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        isSignIn ? signIn(values) : signUp(values)
    }

    const showAlert = (message, type) => {
        return alert && (
            <div style={{ display: message && type !== 'default' ? '' : 'none' }} className={type === 'error' ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" : "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"} role="alert">
                <span className="block sm:inline">{message}</span>
                <span className="absolute top-0 bottom-0 right-0">
                    <button className="border-none" onClick={() => setAlert({ message: '', type: 'default' })}>
                        <svg className={type === 'error' ? "fill-current h-6 w-6 text-red-500" : "fill-current h-6 w-6 text-green-500"} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </button>
                </span>
            </div>
        )
    }

    const showSpinner = loading => {
        return loading && (<Spinner />)
    }

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex flex-col items-center justify-center">
                {showSpinner(loading)}
                {showAlert(alert.message, alert.type)}
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">{isSignIn ? 'Log In' : 'Sign Up'}</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                        />

                        <button type="submit"
                            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
                            onClick={handleSubmit}
                        >{isSignIn ? 'Log In' : 'Create Account'}</button>
                    </form>
                    <div className="flex flex-col space-y-5 mt-2">
                        <span className="flex items-center justify-center space-x-2">
                            <span className="h-px bg-gray-400 w-24"></span>
                            <span className="font-normal text-gray-500">or {isSignIn ? 'log in' : 'sign up'} with</span>
                            <span className="h-px bg-gray-400 w-24"></span>
                        </span>
                        <button onClick={signInWithGithub} className="flex-1 bg-gray-500 text-white py-3 rounded w-full hover:bg-black hover:text-green-200 text-center shadow">
                            <FaGithub className="inline-block text-2xl" /> {isSignIn ? 'Log In' : 'Sign Up'} with <strong>Github</strong>
                        </button>
                        <button onClick={signInWithGoogle} className="flex-1 bg-red-600 text-white py-3 rounded w-full hover:bg-white hover:text-red-600 text-center shadow">
                            <FaGoogle className="inline-block text-2xl" /> {isSignIn ? 'Log In' : 'Sign Up'} with <strong>Google</strong>
                        </button>
                    </div>
                </div>
                <div className="text-grey-dark mt-6">
                    {isSignIn ? 'Already have an account?' : 'Don\'t have an account?'}
                    <a className="no-underline border-b border-blue text-blue-500 cursor-pointer" onClick={e => {
                        e.preventDefault()
                        setIsSignIn(!isSignIn)
                    }}>
                        &nbsp;{isSignIn ? 'Sign Up' : 'Log In'}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Signup