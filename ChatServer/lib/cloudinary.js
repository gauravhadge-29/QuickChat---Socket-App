import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name : process.env.Cloudinary_Cloud_Name,
    api_key : process.env.Cloudinary_API_Key,
    api_secret : process.env.Cloudinary_API_Secret,
});

export default cloudinary;