import mongoose from "mongoose";
import userModel from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";
import cloudinary from "../lib/cloudinary";


//user signup controller
export const signUp = async (req,res)=>{
    const {email,fullName,password,bio} = req.body;
    try {
        if(!email || !fullName || !password){
            return res.status(400).json({success:false, message : "All fields are required"});
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return  res.status(409).json({success:false, message : "User with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);  

        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await new userModel.create({fullName,email,password:hashedPassword,bio});

        const token = generateToken(newUser._id);
        return res.status(201).json({success:true, message : "User created successfully", userdata : newUser, token : token});


    } catch (error) {
        return res.status(500).json({success:false, message : "Internal Server Error"});
    }
}


//user login controller
export const login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).json({success:false, message : "All fields are required"});
        }

        const userData = await userModel.findOne({email});

        if(!userData){
            return res.status(404).json({success:false, message : "User not found"});
        }

        const isPasswordMatch = await bcrypt.compare(password,userData.password);

        if(!isPasswordMatch){
            return res.status(401).json({success:false, message : "Invalid credentials"});
        }

        const token = generateToken(userData._id);

        return res.status(200).json({success:true, message : "Login successful", userdata : userData, token : token});

    }
    catch(error){
        return res.status(500).json({success:false, message : "Internal Server Error"});
    }
} 

//controller to check user is authenticated

export const checkAuth = async(req,res)=>{
    res.json({success:true, message : "User is authenticated", userdata : req.user});
}


//update profile controller

export const updateProfile = async(req,res)=>{
    

    try {
        const {fullName,bio,profilePic} = req.body;
        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await userModel.findByIdAndUpdate(userId, {fullName,bio}, {new : true});
        }else{
            const upload = await cloudinary.uploader.upload(profilePic)

            const updatedUser = await userModel.findByIdAndUpdate(userId, {fullName,bio, profilePic : upload.secure_url}, {new : true});

            return res.status(200).json({success:true, message : "Profile updated successfully", userdata : updatedUser} ); 
        }
    } catch (error) {
        console.log("Error in updating profile",error);
        res.status(500).json({success:false, message : "Internal Server Error"});
    }
}