import validator from 'validator'
import bycrypt from 'bycrypt'
import userModel from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary } from 'cloudinary'

// Api to register user 
const registerUser = async (req,res  )=> {
    try {
        const {name, email, password} = req.body
        if(!name || !password || !email) {
            
            return res.json({status:false,message:"missing Details"})
        }
        // validating email format
        if(!validator.isEmail(email)){
            return res.json({status:false,message:"missing Details"})
        }

        // validating strong password
        if (password.length<8) {
        
            return res.json({status:false,message:"password should be at least 8 characters long"})
        }

        // hashing user password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }
        const newUser = new userModel (userData)
        const user = await newUser.save()

        const token =jwt.sign ({id:user._id}, process.env.JWT_SECRET)
        res.json({status:true,token})


        

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
        
    }
}

//api for user login
const loginUser=async(req, res)=> {
    try {

        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({status:false, message: 'user does not exist'})

        }

        const isMatch = await bycrypt.compare(password, user.password)

        if(isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({status:false, message: "invalid credentials" })
        }

    }catch (error) {
        console.log(error)
        res.json({status:false, message: error.message})

    }
}

//api to get user profile data
const getProfile =async (req, res) => {
    try {
        const {userId} = req.body
        const userData =await userModel.findById(userId).select('-password')
        res.json({sucess:true,userData})
    } catch (error) {
        console.log(error)
        res.json({status:false, message: error.message})
    }
}

// API TO UPDATE USER PROFILE 
const updateProfile = async (req, res) => {
    try {
        const {userId, name , phone , address , dob , gender} = req.body
        const imageFile =req.imageFile
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({success:false,message:"Data Missing"})
            
        } 

        await userModel.findByIdAndUpdate(userId,{name, phone , address:JSON.parse(address),dob, gender})

        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
            
        }
        ResizeObserver.JSON({success:true,message:"Profile Updated"})
      
    } catch (error) {
        console.log(error)
        res.json({status:false, message: error.message})
    }
}

export {registerUser , loginUser , getProfile , updateProfile}