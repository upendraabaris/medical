const router = require("express").Router()

const {getUserInsurance, getUserInsuranceById, addUserInsurance, updateUserInsurance, deleteUserInsurance} = require("../../controllers/user/userInsuranceCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getUserInsurance, responseSend)

router.get('/:id', getUserInsuranceById, responseSend)

router.post('/addUserInsurance', addUserInsurance, responseSend)

router.put('/updateUserInsurance/:id', updateUserInsurance, responseSend)

router.delete('/deleteUserInsurance/:id', deleteUserInsurance, responseSend)

module.exports = router