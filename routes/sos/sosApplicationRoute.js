const router = require("express").Router()

const {getSosApplicationForm, getSosApplicationFormById, addSosApplicationForm, updateSosApplicationForm, deleteSosApplicationForm} = require("../../controllers/sos/sosApplicationFormCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSosApplicationForm, responseSend)

router.get('/public', verifyToken, getSosApplicationForm, responseSend)

router.get('/:id', staffMiddleware, getSosApplicationFormById, responseSend)

router.post('/addSosApplicationForm', staffMiddleware, addSosApplicationForm, responseSend)

router.put('/updateSosApplicationForm/:id', staffMiddleware, updateSosApplicationForm, responseSend)

router.delete('/deleteSosApplicationForm/:id', staffMiddleware, deleteSosApplicationForm, responseSend)

module.exports = router