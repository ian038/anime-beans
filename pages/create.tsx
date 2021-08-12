import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { supabase } from '../supabase'
import Spinner from '../components/Spinner'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const CreatePost: React.FC = () => {
    const { alert, setAlert } = useAuth()
    const [loading, setLoading] = useState<Boolean>(false)
    const [post, setPost] = useState({
        type: '',
        title: '',
        content: ''
    })
    const { type, title, content } = post
    const router = useRouter()

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        if(!title || !content || !type) {
            setAlert({ message: 'All fields are required', type: 'error' })
            return
        } 
        try {
            setLoading(true)
            const user = supabase.auth.user()
            const { data } = await supabase.from(type).insert([
                { title, content, type, user_id: user.id, user_email: user.email }
            ]).single()
            if(data.id !== null) {
                setLoading(false)
                if(data.type === "reviews") {
                    router.push(`/reviews/${data.id}`)
                } else if(data.type === "recaps") {
                    router.push(`/recaps/${data.id}`)
                }
            }
        } catch(error) {
            console.log('Submit Error', error)
            setAlert({ message: error, type: 'error' })
        }
    }

    const showAlert = (message, type) => {
        return alert && (
            <div style={{ display: message && type !== 'default' ? '' : 'none' }} className={type === 'error' ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" : "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"} role="alert">
                <span className="block sm:inline">{message}</span>
                <span className="absolute top-0 bottom-0 right-0">
                    <button className="border-none" onClick={() => setAlert({ message: '', type: 'default' })}>
                        <svg className={type === 'error' ? "fill-current h-6 w-6 text-red-500" : "fill-current h-6 w-6 text-green-500"} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </button>
                </span>
            </div>
        )
    }

    const showSpinner = loading => {
        return loading && (<Spinner />)
    }

    return (
        <Layout>
            <div>
                {showAlert(alert.message, alert.type)}
                {showSpinner(loading)}
                <h1 className="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            onChange={e => { setPost(() => ({ ...post, [e.target.name]: e.target.value })) }}
                            name="title"
                            placeholder="Title"
                            value={post.title}
                            className="shadow appearance-none rounded pb-2 text-lg my-4 focus:shadow-outline w-full text-gray-500 placeholder-gray-500 y-2"
                        /> 
                        <select 
                        name="type"
                        value={post.type} 
                        className="mb-5"
                        onChange={e => { setPost(() => ({ ...post, [e.target.name]: e.target.value })) }}
                        >
                            <option value="">Post Type</option>
                            <option value="reviews">Review</option>
                            <option value="recaps">Recap</option>
                        </select>
                    </div>
                    <SimpleMDE
                        value={post.content}
                        onChange={value => setPost({ ...post, content: value })}
                    />
                    <button
                        type="button"
                        className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
                        onClick={handleSubmit}
                    >Create Post</button>
                </form>
            </div>
        </Layout>
    )
}

export default CreatePost