const express = require("express")
const router = express.Router()
const profileController = require("../controller/profile")
const validateAccountEdit = require("../validation/profile/edit")
const verifyToken = require("../utils/tokenManagement")
router.put("/editProfile", verifyToken.verifyUser,validateAccountEdit, profileController.editProfile)
router.get("/getUserDetails", verifyToken.verifyUser, profileController.getUserDetails)
router.get("/getAllUserDetails", verifyToken.verifyAdmin, profileController.getAllUserDetails)


module.exports = router