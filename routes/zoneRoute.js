const router = require("express").Router()
const {getZone, getZoneById, addZone, updateZone, deleteZone} = require("../controllers/zoneCtrl")
const {responseSend} = require("../utils/response")

router.get('/',  getZone, responseSend)

router.get('/:id', getZoneById, responseSend)

router.post('/addZone', addZone, responseSend)

router.put('/updatZone/:id', updateZone, responseSend)

router.delete('/deleteZone/:id', deleteZone, responseSend)

module.exports = router