const router = require("express").Router()
const {getRegion, getRegionById, addRegion, updateRegion, deleteRegion} = require("../controllers/regionCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getRegion, responseSend)

router.get('/:id', verifyToken, getRegionById, responseSend)

router.post('/addRegion', verifyToken, addRegion, responseSend)

router.put('/updateRegion/:id', verifyToken, updateRegion, responseSend)

router.delete('/deleteRegion/:id', verifyToken, deleteRegion, responseSend)

module.exports = router