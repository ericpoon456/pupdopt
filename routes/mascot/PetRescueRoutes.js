//basic route configuration
const express = require("express");
const router = express.Router();

//extract multer configuration
require("../../config/cloudinary");
const upload = require("../../middlewares/multer");

// controller
const PetRescueController = require("../../controllers/mascot/PetRescueController");

// Middlewares
const { isAdmin, hasPermission } = require("../../middlewares/auth");
const { validateAdoptions } = require("../../middlewares/validations");

//test endpoint
router.get("/rescues/test", (req, res, next) => {
  res.status(200).json("rescue endpoint is working correctly");
});

// START OF ALL VALID ENPOINTS OF ADOPTION POST
router.post(
  "/rescues",
  hasPermission,
  upload.array("petPictures", 2),
  validateAdoptions,
  PetRescueController.createRescue
);

// GET REQUESTS
router.get("/rescues", PetRescueController.getAllRescue);
router.get("/rescues/:id", PetRescueController.getRescueById);

// OTHER ACTIONS
router.put("/rescues/:id", hasPermission, PetRescueController.updateRescue);
router.delete("/rescues/:id", hasPermission, PetRescueController.deleteRescue);

module.exports = router;
