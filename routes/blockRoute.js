const router = require("express").Router()
const {getBlock, getBlockById, addBlock, updateBlock, deleteBlock, deleteAllBlock, getBlockByCityId, getBlockByPostalCodeId} = require("../controllers/blockCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getBlock, responseSend)

router.get('/:id', staffMiddleware, getBlockById, responseSend)

router.post('/addBlock', staffMiddleware, addBlock, responseSend)

router.put('/updateBlock/:id', staffMiddleware, updateBlock, responseSend)

router.delete('/deleteBlock/:id', staffMiddleware, deleteBlock, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllBlock, responseSend)

// router.get('/block-codes/:city_id', getBlockByCityId, responseSend)
router.get('/block-codes/:postal_code_id', getBlockByPostalCodeId, responseSend)

module.exports = router