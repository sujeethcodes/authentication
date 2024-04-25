const express = require("express")
const router = express.Router()
const accountController = require("../controller/accounts")
const accountsValidation = require("../validation/accounts/create")
const otpValidation = require("../validation/accounts/verifyOtp")
const validateLoginAccount = require("../validation/accounts/login")
const verifyToken = require("../utils/tokenManagement")
router.post("/createAccount",accountsValidation, accountController.createAccount)
router.get("/loginAccount",verifyToken.verifyUser, validateLoginAccount, accountController.loginAccount)
router.post("/logOutAccount",verifyToken.verifyUser, accountController.logOutAccount)
router.delete("/deleteAccount",verifyToken.verifyUser, accountController.accountDelete)
router.post("/verifyOtp",otpValidation,accountController.verifyOtp)

module.exports = router