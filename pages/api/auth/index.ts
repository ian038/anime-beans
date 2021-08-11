import { NextApiRequest, NextApiResponse} from 'next'
import { supabase } from '../../../supabase'

export default function authHandler (req: NextApiRequest, res: NextApiResponse) {
    supabase.auth.api.setAuthCookie(req, res)
}

