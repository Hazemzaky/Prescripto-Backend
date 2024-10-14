import jwt from 'jsonwebtoken'
const authAdmin =async (req, res,next) => {
    try {
        const token = req.headers
        if (!token) {
            return res.json({ success:false,message: 'not authorized login again' })
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded !==process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD) {
            return res.json({ success:false,message: 'not authorized login again' })
        }
        
        next()
    } catch (error) {
        return res.json({ success:false,message: error.message })
    }
}

export default authAdmin