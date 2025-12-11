import jwt from "jsonwebtoken";

//function to generate token for user

export const generateToken = (userId)=>{
    const token = jwt.sign({id : userId}, process.env.JWT_SECRET, {expiresIn : '7d'});
    return token;
}