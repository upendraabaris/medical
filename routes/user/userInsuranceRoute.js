const router = require("express").Router()

const {getUserInsurance, getUserInsuranceById, addUserInsurance, updateUserInsurance, deleteUserInsurance} = require("../../controllers/user/userInsuranceCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getUserInsurance, responseSend)

router.get('/:id', verifyToken, getUserInsuranceById, responseSend)

router.post('/addUserInsurance', verifyToken, addUserInsurance, responseSend)

router.put('/updateUserInsurance/:id', verifyToken, updateUserInsurance, responseSend)

router.delete('/deleteUserInsurance/:id', verifyToken, deleteUserInsurance, responseSend)

module.exports = router