import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../auth/AuthContext'
import Spinner from '../components/Spinner'

const Profile = ({}) => {
    const { user, loading } = useAuth()

    if(loading) {
        return loading && (
            (<Spinner />)
        )
    }

    return (
        <Layout>
            <h1>{user && user.email ? `Welcome back, ${user.email}!` : 'Hello, explorer! This is a protected page. Please login/register.'}</h1>
        </Layout>
    )
}

export default Profile