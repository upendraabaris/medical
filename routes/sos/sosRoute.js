const router = require("express").Router()

const {getSos, getSosById, addSos, updateSos, deleteSos} = require("../../controllers/sos/sosCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getSos, responseSend)

router.get('/:id', verifyToken, getSosById, responseSend)

router.post('/addSos', verifyToken, addSos, responseSend)

router.put('/updateSos/:id', verifyToken, updateSos, responseSend)

router.delete('/deleteSos/:id', verifyToken, deleteSos, responseSend)

module.exports = router