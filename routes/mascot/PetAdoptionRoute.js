//basic route configuration
const express = require("express");
const router = express.Router();

//extract multer configuration
require("../../config/cloudinary");
const upload = require("../../middlewares/multer");

// controller
const PetAdoptionController = require("../../controllers/mascot/PetAdoptionController");

// Middlewares
const { isAdmin } = require("../../middlewares/auth");
const { validateAdoptions } = require("../../middlewares/validations");

//test endpoint
router.get("/adoptions/test", (req, res, next) => {
  res.status(200).json("adoption endpoint is working correctly");
});

// START OF ALL VALID ENPOINTS OF ADOPTION POST
router.post(
  "/adoptions",
  upload.array("petPictures", 2),
  validateAdoptions,
  PetAdoptionController.createAdoption,
);

// GET REQUESTS
router.get("/adoptions", PetAdoptionController.getAllAdoption);
router.get("/adoptions/:id", PetAdoptionController.getAdoptionById);

// OTHER ACTIONS
router.put("/adoptions/:id", isAdmin, PetAdoptionController.updateAdoption);
router.delete("/adoptions/:id", isAdmin, PetAdoptionController.deleteAdoption);

module.exports = router;
