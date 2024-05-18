const router = require("express").Router()
const {getPostalCode, getPostalCodeById, addPostalCode, updatePostalCode, deletePostalCode, deleteAllPostalCode, getPostalCodeByCityId, getPostalCodeByCityText} = require("../controllers/postalCodeCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getPostalCode, responseSend)

router.get('/:id', staffMiddleware, getPostalCodeById, responseSend)

router.post('/addPostalCode', staffMiddleware, addPostalCode, responseSend)

router.put('/updatePostalCode/:id', staffMiddleware, updatePostalCode, responseSend)

router.delete('/deletePostalCode/:id', staffMiddleware, deletePostalCode, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllPostalCode, responseSend)

router.get('/postal-codes/:city_id', getPostalCodeByCityId, responseSend)

router.get('/getPostalCodeByCityText/:text', getPostalCodeByCityText, responseSend)

module.exports = router