const router = require("express").Router()

const {getDiseaseSub, getDiseaseSubById, addDiseaseSub, updateDiseaseSub, deleteDiseaseSub} = require("../../controllers/disease/diseaseSubCtrl")

router.get('/', getDiseaseSub)

router.get('/:id', getDiseaseSubById)

router.post('/addDiseaseSub', addDiseaseSub)

router.put('/updateDiseaseSub/:id', updateDiseaseSub)

router.delete('/deleteDiseaseSub/:id', deleteDiseaseSub)

module.exports = router