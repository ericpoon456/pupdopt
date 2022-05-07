//basic route configuration 
const express = require('express');
const router = express.Router();
//extract multer configuration
require('../../config/cloudinary');
const upload = require('../../middlewares/multer');
// The controller
const PetLostController = require('../../controllers/mascot/PetLostController');
// Middleware
const { isAdmin } = require ('../../middlewares/auth');
const { validateAdoptions } = require("../../middlewares/validations");
//test endpoint
router.get('/lost/test', (req, res, next) => {
  res.status(200).json('lost endpoint is working correctly')
})

// START OF ALL VALID ENDPOINTS FOR LOST POSTS
router.post(
  '/lost', 
  upload.array('petPictures', 2), 
  validateAdoptions, 
  PetLostController.createLost
)

// GET REQUESTS
router.get('/lost', PetLostController.getAllLost)
router.get('/lost/:id', PetLostController.getLostById)

// OTHER ACTIONS
router.put('/lost/:id', isAdmin, PetLostController.updateLost)
router.delete('/lost/:id', isAdmin, PetLostController.deleteLost)

module.exports = router;