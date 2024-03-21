const router = require("express").Router()

const {getDisease, getDiseaseById, addDisease, updateDisease, deleteDisease} = require("../../controllers/disease/diseaseCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getDisease)

router.get('/:id', staffMiddleware, getDiseaseById)

router.post('/addDisease', staffMiddleware, addDisease)

router.put('/updateDisease/:id', staffMiddleware, updateDisease)

router.delete('/deleteDisease/:id', staffMiddleware, deleteDisease)

module.exports = router