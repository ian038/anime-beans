import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../auth/AuthContext'
import Spinner from '../components/Spinner'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { supabase } from '../supabase'
import { NextAppPageUserProps, NextAppPageRedirProps } from '../types'

type NextAppPageServerSideProps = NextAppPageUserProps | NextAppPageRedirProps

export const getServerSideProps: GetServerSideProps = async ({ req }): Promise<NextAppPageServerSideProps> => {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    return {
        props: {
            user,
            loggedIn: !!user
        }
    }
}

const Profile = ({ }) => {
    const { user, loading, loggedIn } = useAuth()

    const router = useRouter()

    useEffect(() => {
        if (!loading && !loggedIn) router.push('/auth')
    }, [loading, loggedIn])

    if (loading) {
        return (
            (<Spinner />)
        )
    }

    return (
        <Layout>
            <h1>{user && user.email && `Welcome back, ${user.email}!`}</h1>
        </Layout>
    )
}

export default Profile