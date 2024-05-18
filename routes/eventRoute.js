const router = require("express").Router()
const {getEvent, getEventById, addEvent, updateEvent, deleteEvent} = require("../controllers/enentCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

// router.get('/', staffMiddleware, getEvent, responseSend)
router.get('/public', verifyToken, getEvent, responseSend)

router.get('/:id', staffMiddleware, getEventById, responseSend)

router.post('/addEvent', /* staffMiddleware, */ addEvent, responseSend)

router.put('/updateEvent/:id', staffMiddleware, updateEvent, responseSend)

router.delete('/deleteEvent/:id', staffMiddleware, deleteEvent, responseSend)

module.exports = router