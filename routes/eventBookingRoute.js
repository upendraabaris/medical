const router = require("express").Router()
const {getEventBooking, getEventBookingById, addEventBooking, updateEventBooking, deleteEventBooking} = require("../controllers/eventBookingctrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getEventBooking, responseSend)
router.get('/public', /* verifyToken, */ getEventBooking, responseSend)

router.get('/:id', staffMiddleware, getEventBookingById, responseSend)

router.post('/add', /* staffMiddleware, */ addEventBooking, responseSend)

router.put('/updateEventBooking/:id', staffMiddleware, updateEventBooking, responseSend)

router.delete('/deleteEventBooking/:id', staffMiddleware, deleteEventBooking, responseSend)

module.exports = router