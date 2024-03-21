const router = require("express").Router()

const {getDiseaseSub, getDiseaseSubById, addDiseaseSub, updateDiseaseSub, deleteDiseaseSub} = require("../../controllers/disease/diseaseSubCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getDiseaseSub)

router.get('/:id', staffMiddleware, getDiseaseSubById)

router.post('/addDiseaseSub', staffMiddleware, addDiseaseSub)

router.put('/updateDiseaseSub/:id', staffMiddleware, updateDiseaseSub)

router.delete('/deleteDiseaseSub/:id', staffMiddleware, deleteDiseaseSub)

module.exports = router