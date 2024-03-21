const router = require("express").Router()

const {getSos, getSosById, addSos, updateSos, deleteSos} = require("../../controllers/sos/sosCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSos, responseSend)

router.get('/:id', staffMiddleware, getSosById, responseSend)

router.post('/addSos', staffMiddleware, addSos, responseSend)

router.put('/updateSos/:id', staffMiddleware, updateSos, responseSend)

router.delete('/deleteSos/:id', staffMiddleware, deleteSos, responseSend)

module.exports = router