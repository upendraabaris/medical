const router = require("express").Router()

const {getDisease, getDiseaseById, addDisease, updateDisease, deleteDisease} = require("../../controllers/disease/diseaseCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getDisease)

router.get('/:id', verifyToken, getDiseaseById)

router.post('/addDisease', verifyToken, addDisease)

router.put('/updateDisease/:id', verifyToken, updateDisease)

router.delete('/deleteDisease/:id', verifyToken, deleteDisease)

module.exports = router