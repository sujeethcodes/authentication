const express = require("express")
const router = express.Router()
const accounts = require("../api/routes/accounts")
const profile = require("../api/routes/profile")
router.use("/accounts", accounts)
router.use("/profile", profile)

module.exports = router