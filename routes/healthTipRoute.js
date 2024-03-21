const router = require("express").Router()
const {getHealthTip, getHealthTipById, addHealthTip, updateHealthTip, deleteHealthTip} = require("../controllers/healthTipCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getHealthTip, responseSend)

router.get('/:id', staffMiddleware, getHealthTipById, responseSend)

router.post('/addHealthTip', staffMiddleware, addHealthTip, responseSend)

router.put('/updateHealthTip/:id', staffMiddleware, updateHealthTip, responseSend)

router.delete('/deleteHealthTip/:id', staffMiddleware, deleteHealthTip, responseSend)

module.exports = router