const router = require("express").Router()

const {getUserInsurance, getUserInsuranceById, addUserInsurance, updateUserInsurance, deleteUserInsurance} = require("../../controllers/user/userInsuranceCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getUserInsurance, responseSend)

router.get('/:id', staffMiddleware, getUserInsuranceById, responseSend)

router.post('/addUserInsurance', staffMiddleware, addUserInsurance, responseSend)

router.put('/updateUserInsurance/:id', staffMiddleware, updateUserInsurance, responseSend)

router.delete('/deleteUserInsurance/:id', staffMiddleware, deleteUserInsurance, responseSend)

module.exports = router