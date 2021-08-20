import React from 'react'
import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import { supabase } from '../supabase'
import { feedProps } from '../types'
import { useRouter } from "next/router";
import { useAuth } from '../auth/AuthContext'
import ReactMarkdown from "react-markdown";

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase.from('posts').select()
  return {
    props: { data, error },
    revalidate: 5
  }
}

const Home: React.FC<feedProps> = (props) => {
  const { alert, setAlert } = useAuth()
  const router = useRouter()

  if (props.error) {
    setAlert({ message: props.error.message, type: 'error' })
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

  return (
    <Layout>
      {showAlert(alert.message, alert.type)}
      <div>
        <h1>All Posts</h1>
        <main>
          {props.data.map(p => (
            <div key={p.id} className="mt-4">
              <div className='p-8 cursor-pointer border-2 border-b-8 border-green-300' onClick={() => router.push(p.type === 'reviews' ? `/reviews/${p.id}` : `/recaps/${p.id}`)}>
                <h2>{p.title}</h2>
                <small>By {p.user_email ? p.user_email : "Unknown author"} on {p.inserted_at}</small>
                <ReactMarkdown>{p.content}</ReactMarkdown>
              </div>
              <br />
              <hr />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Home
