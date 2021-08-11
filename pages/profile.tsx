import { Auth, Typography, Button } from '@supabase/ui'
const { Text } = Typography
import React from 'react'
import Layout from '../components/Layout'

const Profile = (props) => {
    return (
        <Layout>
            <h1>Hello, you are authenticated! This is a protected page.</h1>
            {/* <Text>Signed In: {user.email}</Text> */}
            {/* <Button block onClick={() => props.supabaseClient.auth.signOut()}>
                Sign Out
            </Button> */}
        </Layout>
    )
}

export default Profile