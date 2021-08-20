import { User } from '@supabase/supabase-js'

export type AuthFieldProps = {
    email: string,
    password: string
}

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