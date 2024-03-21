const router = require("express").Router()
const {getZone, getZoneById, addZone, updateZone, deleteZone} = require("../controllers/zoneCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getZone, responseSend)

router.get('/:id', staffMiddleware, getZoneById, responseSend)

router.post('/addZone', staffMiddleware, addZone, responseSend)

router.put('/updatZone/:id', staffMiddleware, updateZone, responseSend)

router.delete('/deleteZone/:id', staffMiddleware, deleteZone, responseSend)

module.exports = router