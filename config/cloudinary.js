//the basic configuration of Cloudinary
const cloudinary = require('cloudinary'); 
require('dotenv').config({ path: '.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
})