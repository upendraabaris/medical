const router = require("express").Router()

const {getDisease, getDiseaseById, addDisease, updateDisease, deleteDisease} = require("../../controllers/disease/diseaseCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getDisease, responseSend)

router.get('/:id', staffMiddleware, getDiseaseById, responseSend)

router.post('/add', /* staffMiddleware, */ addDisease, responseSend)

router.put('/update/:id', /* staffMiddleware, */ updateDisease, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteDisease, responseSend)

module.exports = router