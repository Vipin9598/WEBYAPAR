const User = require("../models/User");
const Profile = require("../models/profile")
const bcrypt = require("bcrypt")
const {upload2Cloudinary} = require("../utils/cloudinaryUploader")
require("dotenv").config()

exports.createUser = async(req,res)=>{
    try{
        const {userId,password} = req.body;
    const user =await  User.findOne({Id:userId})
    if(user){
        return res.status(203).json({
            success:false,
            message:"User already exist"
        })
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await  User.create({
        Id:userId,
        password:hashPassword,
        validation:"Pending"
    })

    return res.status(200).json({
        success:true,
        message:"User registered Successfully",
        user
    })
    }
    catch(err){
        console.log("error..........",err)
        return res.status(404).json({
            success:false,
            message:"Failed to create a new user"
        })
    }

}

exports.addUserDetails = async(req,res)=>{
    try{
        const {name,userId} = req.body;
        const image = req.files.image;
        if(!name || !image || ! userId){
            return res.status(204).json({
                success:false,
                message:"Please Provide all the details"
            })
        }
        const imageUpload = await upload2Cloudinary(image,process.env.FOLDER_NAME)
        const profile = await Profile.create({
            name:name,
            image:imageUpload.secure_url
        })
        const user = await User.findOneAndUpdate({Id:userId},{additionalDetails:profile._id},{new:true})

        return res.status(200).json({
            success:true,
            message:"Upload Successfully",
            data:user
        })

    } catch(error){
        console.log("error aa gya image upload krte wqt ",error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.LogIn= async(req,res)=>{
    try{
        const {
            userId,
            password
        } = req.body;

        if(!userId || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are mandatory"
            })
        }
        // check register user
        const user = await User.findOne({Id:userId}).populate('additionalDetails').exec();
        
        if(! user){
            return res.status(201).json({
                success:false,
                message:"User not registered ,Create first"
            })
        }
        //password checked

        if(await bcrypt.compare(password,user.password)){

            res.status(200).json({
                success:true,
                data:user,
                message:"Logged in Successfully"
            })
         
        }
        else{
            return res.status(202).json({
                success:false,
                message : "Password Incorrect"
            })
        }

    }
    catch(error){
        console.log("error occur during login : ",error)
        return res.status(404).json({
            success:false,
            message:"Try Again"
        })
    }
}

exports.validation = async(req,res) => {
    try{
        const {Id} = req.body;

    const updatedUser = await User.findOneAndUpdate({Id:Id},{ $set: { validation: "Verified" } },{new:true})
    
    return res.status(200).json({
        success:true,
        message:"Verification Done ",
        data:updatedUser
    })
    }
    catch(error){
        return res.status(402).json({
            success:false,
            message:"Verification Failed",
            
        })
    }
}

exports.fetchAllUser =async(req,res) => {
    
    try{
        const userData = await User.find({}).populate("additionalDetails").exec()
        if(userData){
            return res.status(200).json({
                success:true,
                message:"User Detail fetched",
                data:userData
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to fetch the detail  of the user"
        })
    }
}

exports.deleteUser = async(req,res) => {
    try{
        const {Id}=req.body;
        const user = await User.findOne({Id:Id})
        await Profile.findByIdAndDelete({_id:user?.additionalDetails})
        await User.findOneAndDelete({Id:Id})
        const userData = await User.find({}) 
        return res.status(200).json({
            success:true,
            message:"User Delete Successfully",
            data:userData
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to delete the User Try After Some time"
        })
    }
}