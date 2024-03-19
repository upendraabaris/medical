const router = require("express").Router()

const {getSosApplicationForm, getSosApplicationFormById, addSosApplicationForm, updateSosApplicationForm, deleteSosApplicationForm} = require("../../controllers/sos/sosApplicationFormCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getSosApplicationForm, responseSend)

router.get('/:id', verifyToken, getSosApplicationFormById, responseSend)

router.post('/addSosApplicationForm', verifyToken, addSosApplicationForm, responseSend)

router.put('/updateSosApplicationForm/:id', verifyToken, updateSosApplicationForm, responseSend)

router.delete('/deleteSosApplicationForm/:id', verifyToken, deleteSosApplicationForm, responseSend)

module.exports = router