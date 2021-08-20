import { PostgrestError, User } from '@supabase/supabase-js'

export type AuthFieldProps = {
    email: string,
    password: string
}

export type PostTypeProps = {
    data: {
        id: number
        title: string
        user_email: string | null
        content: string
        type: string
        inserted_at: string
    }
    user: {
        email: string
    }
}

export type PostProps = {
    id: number
    title: string
    user_email: string | null
    content: string
    type: string
    inserted_at: string
}

export type NextAppPageUserProps = {
    props: {
        user: User,
        loggedIn: boolean
    }
}

export type NextAppPageRedirProps = {
    redirect: {
        destination: string,
        permanent: boolean
    }
}

export type feedProps = {
    data: PostProps[],
    error: PostgrestError
}