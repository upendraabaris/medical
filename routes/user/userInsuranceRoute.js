const router = require("express").Router()

const {getUserInsurance, getUserInsuranceById, addUserInsurance, updateUserInsurance, deleteUserInsurance} = require("../../controllers/user/userInsuranceCtrl")

router.get('/', getUserInsurance)

router.get('/:id', getUserInsuranceById)

router.post('/addUserInsurance', addUserInsurance)

router.put('/updateUserInsurance/:id', updateUserInsurance)

router.delete('/deleteUserInsurance/:id', deleteUserInsurance)

module.exports = router