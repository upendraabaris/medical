const router = require("express").Router()
const {getCountry, getCountryById, addCountry, updateCountry, deleteCountry, deleteAllCountry, getCountryByRegionId} = require("../controllers/countryCtrl")
const {responseSend} = require("../utils/response")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getCountry, responseSend)

router.get('/region/:region_id?', getCountryByRegionId, responseSend)

router.get('/public', getCountry, responseSend)

router.get('/:id', /* staffMiddleware, */ getCountryById, responseSend)

router.post('/addCountry', /* staffMiddleware, */ addCountry, responseSend)

router.put('/updatCountry/:id', /* staffMiddleware, */ updateCountry, responseSend)

router.delete('/deleteCountry/:id', /* staffMiddleware, */ deleteCountry, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllCountry, responseSend)

module.exports = router