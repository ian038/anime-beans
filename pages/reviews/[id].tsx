import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from "next"
import ReactMarkdown from 'react-markdown'
import { supabase } from '../../supabase'
import { useAuth } from '../../auth/AuthContext'
import { PostProps } from '../../components/Post'
import Spinner from '../../components/Spinner'
import Layout from '../../components/Layout'
import axios from 'axios'

const Review: React.FC<PostProps> = ({ data, user }) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()    
  const { loggedIn } = useAuth()
  const postBelongsToUser = user.email === data.user_email
  const publishedDate = new Date(data.inserted_at)

  if (router.isFallback) {
    return (<Spinner />)
  }

  const deletePost = async(id: number) => {
    setLoading(true)
    const res = await axios({
        method: 'DELETE',
        url: `/api/reviews/${id}`
    })
    if(res.status === 200) {
        setLoading(false)
    }
    // router.push('/reviews')
    router.push('/')
  }

  const showSpinner = loading => {
    return loading && (<Spinner />)
  }

  return (
    <Layout>
        <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style={{ fontFamily: 'Georgia,serif' }}>
            {showSpinner(loading)}
            <div className="font-sans">
				<p className="text-base md:text-sm text-green-500 font-bold">&lt; <a href="/reviews" className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">BACK TO REVIEWS</a></p>
					<h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{data.title}</h1>
					<p className="text-sm md:text-base font-normal text-gray-600">Published by {data.user_email} on {publishedDate.toLocaleDateString()}</p>
			</div>
            <div className="mt-8">
                <ReactMarkdown>{data.content}</ReactMarkdown>
            </div>
            <div className="mb-4">
                {loggedIn && postBelongsToUser && (
                    <button onClick={() => deletePost(data.id)} className="mt-5 bg-red-500 text-white py-3 rounded w-full hover:bg-white hover:bg-red-700 text-center shadow">
                        Delete Review
                    </button>
                )}
            </div>
        </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    const { data } = await supabase.from('reviews').select().filter('id', 'eq', params.id).single()
    return {
      props: {
        data,
        user
      }
    }
}

export default Review