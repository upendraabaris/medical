const router = require("express").Router()

const {getDiseaseSub, getDiseaseSubById, addDiseaseSub, updateDiseaseSub, deleteDiseaseSub} = require("../../controllers/disease/diseaseSubCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getDiseaseSub)

router.get('/:id', verifyToken, getDiseaseSubById)

router.post('/addDiseaseSub', verifyToken, addDiseaseSub)

router.put('/updateDiseaseSub/:id', verifyToken, updateDiseaseSub)

router.delete('/deleteDiseaseSub/:id', verifyToken, deleteDiseaseSub)

module.exports = router