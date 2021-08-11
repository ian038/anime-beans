import React, { createContext, useContext,useState, useEffect } from "react"
import { supabase } from '../api'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

type SupabaseAuthPayload = {
    email: string,
    password: string
}

type MessageType = 'success' | 'error' | 'default'

type AlertMessage = {
    message: string,
    type: MessageType
}

interface AuthContextProps {
    user: User
    signUp: (payload: SupabaseAuthPayload) => void
    signIn: (payload: SupabaseAuthPayload) => void
    signOut: () => void
    alert: AlertMessage
    setAlert: React.Dispatch<AlertMessage>
    loading: boolean
    loggedIn: boolean
}

const authContext = createContext<Partial<AuthContextProps>>({})

function useProvideAuth() {
    const router = useRouter()
    const [user, setUser] = useState<User>(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [alert, setAlert] = useState<AlertMessage>({
        message: '',
        type: 'default'
    })
    const [loading, setLoading] = useState(false)

    const signUp = async (payload: SupabaseAuthPayload) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signUp(payload)
            if(error) {
                setAlert({ message: error.message, type: 'error' })
            } else {
                setAlert({ message: `Signup successful. Please check your inbox for a confirmation email!`, type: 'success' })
            } 
        } catch(error) {
            setAlert({ message: error.error_description || error, type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const signIn = async (payload: SupabaseAuthPayload) => {
        try {
            const { error } = await supabase.auth.signIn(payload)
            if(error) {
                setAlert({ message: error.message, type: 'error' })
            }
        } catch(error) {
            setAlert({ message: error.error_description || error, type: 'error' })
        }
    }

    const signOut = async() => await supabase.auth.signOut()

    // when page is done loading, set user object(if found)
    useEffect(() => {
        const user = supabase.auth.user()

        if(user) {
            setUser(user)
            setLoading(false)
            setLoggedIn(true)
            router.push('/profile')
        }

        // similarly, whenever there is a change in state, check availability of user object
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async(event, session) => {
                const user = session?.user! ?? null
                setLoading(false)
                if(user) {
                    setUser(user)
                    setLoggedIn(true)
                    router.push('/profile')
                } else {
                    setUser(null)
                    router.push('/')
                }
            }
        )
        
        return () => { authListener.unsubscribe() }
    }, [])

    return {
        user,
        loading,
        signUp,
        signIn,
        signOut,
        alert,
        setAlert,
        loggedIn
    }
}

export function AuthProvider({ children }: any) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)