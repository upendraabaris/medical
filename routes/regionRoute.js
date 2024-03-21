const router = require("express").Router()
const {getRegion, getRegionById, addRegion, updateRegion, deleteRegion} = require("../controllers/regionCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getRegion, responseSend)

router.get('/:id', staffMiddleware, getRegionById, responseSend)

router.post('/addRegion', staffMiddleware, addRegion, responseSend)

router.put('/updateRegion/:id', staffMiddleware, updateRegion, responseSend)

router.delete('/deleteRegion/:id', staffMiddleware, deleteRegion, responseSend)

module.exports = router