const router = require("express").Router()
const {getZone, getZoneById, addZone, updateZone, deleteZone} = require("../controllers/zoneCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getZone, responseSend)

router.get('/:id', verifyToken, getZoneById, responseSend)

router.post('/addZone', verifyToken, addZone, responseSend)

router.put('/updatZone/:id', verifyToken, updateZone, responseSend)

router.delete('/deleteZone/:id', verifyToken, deleteZone, responseSend)

module.exports = router