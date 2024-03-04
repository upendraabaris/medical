const router = require("express").Router()

const {getMedicine, getMedicineById, addMedicine, updateMedicine, deleteMedicine} = require("../controllers/medicineTypeCtrl")

router.get('/', getMedicine)

router.get('/:id', getMedicineById)

router.post('/addMedicine', addMedicine)

router.put('/updateMedicine/:id', updateMedicine)

router.delete('/deleteMedicine/:id', deleteMedicine)

module.exports = router