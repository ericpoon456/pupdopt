//multer configuration
const multer = require("multer"); 
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); //review the documentation for this module
const { v4: uuidv4 } = require('uuid'); //used to generate new names from a unique id
const path = require('path');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname)); //an id with the original file extension is appended as file name
  },
  params: {
      folder: "adoptapy",      
      allowedFormats: ["jpg", "png", "jpeg"],
      transformation: [{
      width: 500,
      height: 500,
      crop: "limit"
      }]
  }
});

const upload = multer({ 
  storage: storage, 
  limits: { 
    fieldSize: 10 * 1024 * 1024 
  } 
});

module.exports = upload;