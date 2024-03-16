const router = require("express").Router()

const {getDisease, getDiseaseById, addDisease, updateDisease, deleteDisease} = require("../../controllers/disease/diseaseCtrl")

router.get('/', getDisease)

router.get('/:id', getDiseaseById)

router.post('/addDisease', addDisease)

router.put('/updateDisease/:id', updateDisease)

router.delete('/deleteDisease/:id', deleteDisease)

module.exports = router