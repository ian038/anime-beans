import React from 'react'
import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import { supabase } from '../supabase'
import { feedProps } from '../types'
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase.from('posts').select()
  return {
    props: { data, error },
    revalidate: 5
  }
}

const Home: React.FC<feedProps> = (props) => {
  const router = useRouter()

  return (
    <Layout>
      <div>
        <h1>All Posts</h1>
        <main>
          {props.data.map(p => (
            <div key={p.id}>
              <div className='p-8' onClick={() => router.push(p.type === 'reviews' ? `/reviews/${p.id}` : `/recaps/${p.id}`)}>
                <h2>{p.title}</h2>
                <small>By {p.user_email ? p.user_email : "Unknown author"} on {p.inserted_at}</small>
                <ReactMarkdown>{p.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Home
