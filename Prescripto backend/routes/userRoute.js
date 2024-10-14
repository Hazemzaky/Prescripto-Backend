import express from 'express'
import {registerUser , loginUser , getProfile , updateProfile} from'../conntrollers/userController.js'
import authUser from '../backend/middlewares/authUsers.js'

const userRouter = express.Router()

userRouter.post('/register', rigisterUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'),authUser,updateProfile)



export default userRouter