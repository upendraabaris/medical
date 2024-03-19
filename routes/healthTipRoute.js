const router = require("express").Router()
const {getHealthTip, getHealthTipById, addHealthTip, updateHealthTip, deleteHealthTip} = require("../controllers/healthTipCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getHealthTip, responseSend)

router.get('/:id', verifyToken, getHealthTipById, responseSend)

router.post('/addHealthTip', verifyToken, addHealthTip, responseSend)

router.put('/updateHealthTip/:id', verifyToken, updateHealthTip, responseSend)

router.delete('/deleteHealthTip/:id', verifyToken, deleteHealthTip, responseSend)

module.exports = router