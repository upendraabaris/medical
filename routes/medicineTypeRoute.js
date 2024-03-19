const router = require("express").Router()
const {getMedicine, getMedicineById, addMedicine, updateMedicine, deleteMedicine} = require("../controllers/medicineTypeCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getMedicine, responseSend)

router.get('/:id', verifyToken, getMedicineById, responseSend)

router.post('/addMedicine', verifyToken, addMedicine, responseSend)

router.put('/updateMedicine/:id', verifyToken, updateMedicine, responseSend)

router.delete('/deleteMedicine/:id', verifyToken, deleteMedicine, responseSend)

module.exports = router