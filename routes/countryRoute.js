const router = require("express").Router()
const {getCountry, getCountryById, addCountry, updateCountry, deleteCountry} = require("../controllers/countryCtrl")
const {responseSend} = require("../utils/response")
const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getCountry, responseSend)

router.get('/:id', verifyToken, getCountryById, responseSend)

router.post('/addCountry', verifyToken, addCountry, responseSend)

router.put('/updatCountry/:id', verifyToken, updateCountry, responseSend)

router.delete('/deleteCountry/:id', verifyToken, deleteCountry, responseSend)

module.exports = router