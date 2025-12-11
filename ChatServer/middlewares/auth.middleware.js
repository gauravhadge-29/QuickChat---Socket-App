import jwt from "jsonwebtoken";
import userModel from "../models/User";

export const protectRoute = async (req,res,next)=>{
    let token = req.headers.token;
    if(!token){
        token = req.body.token || req.query.token;
    }
    if(!token){
        return res.status(401).json({success:false, message : "No token provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id).select('-password');

        if(!user){
            return res.status(404).json({success:false, message : "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in auth",error);
        return res.status(401).json({success:false, message : "Invalid token"});
    }
}