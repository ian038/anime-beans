import React, { createContext, useContext,useState } from "react"
import { supabase } from '../api'

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
    signUp: (payload: SupabaseAuthPayload) => void
    signIn: (payload: SupabaseAuthPayload) => void
    alert: AlertMessage
    setAlert: React.Dispatch<AlertMessage>
    loading: boolean
}

const authContext = createContext<Partial<AuthContextProps>>({})

function useProvideAuth() {
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
            } else {
                setAlert({ message: `Log in successful. Redirecting now`, type: 'success' })
            } 
        } catch(error) {
            setAlert({ message: error.error_description || error, type: 'error' })
        }
    }

    return {
        loading,
        signUp,
        signIn,
        alert,
        setAlert
    }
}

export function AuthProvider({ children }: any) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)