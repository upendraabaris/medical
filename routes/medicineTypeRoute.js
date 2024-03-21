const router = require("express").Router()
const {getMedicine, getMedicineById, addMedicine, updateMedicine, deleteMedicine} = require("../controllers/medicineTypeCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getMedicine, responseSend)

router.get('/:id', staffMiddleware, getMedicineById, responseSend)

router.post('/addMedicine', staffMiddleware, addMedicine, responseSend)

router.put('/updateMedicine/:id', staffMiddleware, updateMedicine, responseSend)

router.delete('/deleteMedicine/:id', staffMiddleware, deleteMedicine, responseSend)

module.exports = router