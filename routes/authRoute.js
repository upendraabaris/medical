const router = require("express").Router()
const { login, /* verifyToken, */ isEmailExist, isMobileNoExist, verifyEmail, verifyEmailOtp, register, register2, register3, forgotPasswordChange } = require("../controllers/authCtrl")

const {responseSend} = require("../utils/response")

router.get("/isEmailExist/:email", isEmailExist)

router.get("/isMobileNoExist/:mobile", isMobileNoExist)

router.post("/mb/verifyEmail", verifyEmail)

router.post("/mb/verifyEmailOtp", verifyEmailOtp)

router.post('/mb/login', login, responseSend)

// router.post("/register-step1", register)

// router.post("/register-step2", register2)

router.post("/mb/register", register)

router.post("/mb/forgotPassword", forgotPasswordChange)

// router.post('/verifyToken', verifyToken, responseSend)

module.exports = router