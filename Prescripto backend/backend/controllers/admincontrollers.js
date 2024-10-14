// api to get all doctors list forb admin panel
const allDoctors=async (req,res) => {
    try {
        const doctors =await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})


    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export {addDoctor,loginAdmin,allDoctors}