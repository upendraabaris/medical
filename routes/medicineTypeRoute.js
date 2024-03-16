const router = require("express").Router()
const {getMedicine, getMedicineById, addMedicine, updateMedicine, deleteMedicine} = require("../controllers/medicineTypeCtrl")
const {responseSend} = require("../utils/response")

router.get('/', getMedicine, responseSend)

router.get('/:id', getMedicineById, responseSend)

router.post('/addMedicine', addMedicine, responseSend)

router.put('/updateMedicine/:id', updateMedicine, responseSend)

router.delete('/deleteMedicine/:id', deleteMedicine, responseSend)

module.exports = router