import { supabase } from "../../../supabase"
export default async function handler(req, res) {
    const reviewId = req.query.id
    if (req.method === 'DELETE') {
        const response = await supabase.from('posts').delete().match({ id: reviewId })
        res.json(response)
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
    }
}