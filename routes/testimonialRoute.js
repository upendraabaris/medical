const router = require("express").Router()
const {getTestimonial, getTestimonialById, addTestimonial, updateTestimonial, deleteTestimonial, deleteAllTestimonial, getTestimonialByUserId} = require("../controllers/testimonialCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getTestimonial, responseSend)

router.get('/:id', staffMiddleware, getTestimonialById, responseSend)

router.post('/addTestimonial', staffMiddleware, addTestimonial, responseSend)

router.put('/updateTestimonial/:id', staffMiddleware, updateTestimonial, responseSend)

router.delete('/deleteTestimonial/:id', staffMiddleware, deleteTestimonial, responseSend)

router.get('/user/:id', staffMiddleware ,getTestimonialByUserId)

module.exports = router