import { Auth, Typography, Button } from '@supabase/ui'
const { Text } = Typography
import { supabase } from '../api'
import React from 'react'

const Profile = (props) => {
    const { user } = Auth.useUser()
    if (user) {
        return (
            <>
                <Text>Signed In: {user.email}</Text>
                <Button block onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign Out
                </Button>
            </>
        )
    }
    return props.children
}

const AuthProfile: React.FC = () => {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Profile supabaseClient={supabase}>
                <Auth supabaseClient={supabase} />
            </Profile>
        </Auth.UserContextProvider>
    )
}

export default AuthProfile