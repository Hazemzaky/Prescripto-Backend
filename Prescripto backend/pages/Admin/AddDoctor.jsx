import React, { useContext, useState } from 'react';
import { assets} from '../../assets/assets'
import { useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify'
import axios from 'axios';

const AddDoctor =() => { 
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('1 year ')
    const [experience, setExperience] = useState('')
    const [nfees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [specialization, setSpecialization] = useState('Cardiology')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const {backendUrl ,  aToken} =useContext(AdminContext)

 

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('image not selected')

            }
            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('specialization', specialization)
            formData.append('degree', degree)
            formData.append('address',JSON.stringify( {line1:address1, line2:address2}))

            // console.log formData
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            })
            const {data} =await axios.post(backendUrl + '/api/admin/add-doctor' , formData , {headers:{aToken} } )
            if(data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('')
                setFees('')
                setAbout('')
                setSpecialization('')
                setDegree('')
                setAddress1('')
                setAddress2('')
                
            }else {
                 toast.error(data.message)}
        
        } catch (error) {
            toast.error(error.message)
            console.log(error) }
    }




    return (
        <form  onSubmit={onSubmitHandler} className= 'm-5 w-full' >
            <p className= 'mb-3 text-lg font-medium' >AddDoctor</p>
            <div className= 'bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow'>
            <div className= 'flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                    <img>className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) assets.upload_area} alt="" </img> 

                </label>
                <input onChange={(e)=> setDocImg(e.target.files[0])} className='border ounded px-3 py-2' type='file' id='doc-img' className='hidden'/>
                <p>Upload doctor <br /> picture </p>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>

                    <div className='flex-1 flex flex-col gap-1' >
                        <p>Doctor name</p>
                        <input onChange={(e)=> setName(e.target.value)} value={name} className='border ounded px-3 py-2' type="text" placeholder='Name' required />
                    </div>
                    <div  className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border ounded px-3 py-2' type="email" placeholder='Email' required />
                    </div>
                    <div  className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Password</p>
                        <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border ounded px-3 py-2' type="password" placeholder='password' required />
                    </div>

                    <div>
                        <p>Experience</p>
                        <select onChange={(e)=> setExperience(e.target.value)} value={experience} className='border ounded px-3 py-2' name="" id="">
                            <option value="">Select experience</option>
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                            <option value="4">4 Years</option>
                            <option value="5">5 Years</option>
                        </select>
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Fees</p>
                        <input onChange={(e)=> setFees(e.target.value)} value={fees} className='border ounded px-3 py-2' type="number" placeholder='Fees' required />

                    </div>

                        
                </div>

                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                <div>
                    <p>Specialization</p>
                    <select onChange={(e)=> setSpecialization(e.target.value)} value={specialization} className='border ounded px-3 py-2' name="" id="">
                        <option value="">Select specialization</option>
                        <option value="1">Cardiology</option>
                        <option value="2">Dermatology</option>
                        <option value="3">Neurology</option>
                        <option value="4">Orthopedics</option>
                        <option value="5">Pediatrics</option>
                    </select>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Education</p>
                    <input onChange={(e)=> setDegree(e.target.value)} value={degree} className='border ounded px-3 py-2' type="text" placeholder='Education' required />
                </div>
                <div className='flex-1 flex flex-col gap-1' > 
                    <p>Address</p>
                    <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className='border ounded px-3 py-2' type="text" placeholder='Address 1' required />
                    <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className='border ounded px-3 py-2' type="text" placeholder='Address 2' required />
                </div>

            </div>
         </div>   

         <div>
            <p className='mt-4 mb-2' > About Doctor </p>
            <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='write about doctor' rows={5} required />
         </div>
         <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full' >Add Doctor</button>
         </div>
         </form>

       


)}

export default AddDoctor;
