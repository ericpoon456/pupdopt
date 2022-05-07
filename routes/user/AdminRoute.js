const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/user/AdminController");
const invitationController = require("../../controllers/user/InvitationController");
const {
  isAdmin,
  checkDuplicateNameOrEmail,
} = require("../../middlewares/auth");

//test endpoint
router.get("/admin/test", (req, res, next) => {
  res.status(200).json("admin endpoint is working correctly");
});

// START OF ALL VALID ENDPOINTS OF ADMIN SECTION
router.post("/admin", adminController.createAdmin); // create a new admin
router.post(
  "/admin/signin",
  checkDuplicateNameOrEmail,
  adminController.signInAdmin
); // login
router.post("/admin/invitation", isAdmin, invitationController.createInvitationLink); // create an invitation link

module.exports = router;
