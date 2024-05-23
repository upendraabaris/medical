const router = require("express").Router()
const {getZone, getZoneById, addZone, updateZone, deleteZone, deleteAllZone, getZoneCityMapping, getZoneByStateId, SocketHandler} = require("../controllers/zoneCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getZone, responseSend)

router.get('/getZoneCityMapping', /* staffMiddleware, */ getZoneCityMapping, responseSend)

router.get('/:id', staffMiddleware, getZoneById, responseSend)

router.post('/addZone', staffMiddleware, addZone, responseSend)

router.put('/updatZone/:id', staffMiddleware, updateZone, responseSend)

router.delete('/deleteZone/:id', staffMiddleware, deleteZone, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllZone, responseSend)

router.get('/zones/:state_id', getZoneByStateId, responseSend)

router.get('/web/websocket', SocketHandler)

module.exports = router