const router = require("express").Router()
const {getIndication, getIndicationById, addIndication, updateIndication, deleteIndication, deleteAllIndicationType} = require("../controllers/indicationCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getIndication, responseSend)

router.get('/:id', staffMiddleware, getIndicationById, responseSend)

router.post('/addIndication', staffMiddleware, addIndication, responseSend)

router.put('/updateIndication/:id', staffMiddleware, updateIndication, responseSend)

router.delete('/deleteIndication/:id', staffMiddleware, deleteIndication, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllIndicationType, responseSend)

router.get('/get/public', sellerUserMiddleware, getIndication, responseSend)

module.exports = router