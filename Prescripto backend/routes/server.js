import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import adminRouter from './routes/adminroutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import useRouter from './routes/userRoute.js'

const app = express()
const port = process.env.port || 4000
connectDb()
connectCloudinary()


App.use(express.json())
App.use(cors())


App.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRouter)
app.use('/api/user',useRouter)



App.ger('/',(req,res) => {
    resizeBy.send('API WORKING')
})

App.listen(port, ()=> console.log("Server Started" , port))