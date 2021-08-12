import React from 'react'
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
    data: {
        id: number
        title: string
        user_email: string | null
        content: string
        inserted_at: string
    },
    user: {
        email: string
    }
}

const Post: React.FC<PostProps> = ({ data }) => {
    const router = useRouter()
    const authorName = data.user_email ? data.user_email : "Unknown author"

    return (
      <div className='p-8' onClick={() => router.push("/post/[id]", `/post/${data.id}`)}>
        <h2>{data.title}</h2>
        <small>By {authorName} on {data.inserted_at}</small>
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>
    );
}

export default Post