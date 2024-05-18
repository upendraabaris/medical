const router = require("express").Router()
const {getEventType, getEventTypeById, addEventType, updateEventType, deleteEventType} = require("../controllers/eventTypeCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getEventType, responseSend)

// router.get('/public', verifyToken, getEventType, responseSend)

router.get('/:id', staffMiddleware, getEventTypeById, responseSend)

router.post('/addEventType', staffMiddleware, addEventType, responseSend)

router.put('/updateEventType/:id', staffMiddleware, updateEventType, responseSend)

router.delete('/deleteEventType/:id', staffMiddleware, deleteEventType, responseSend)

module.exports = router