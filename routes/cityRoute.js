const router = require("express").Router()
const {getCity, getCityById, addCity, updateCity, deleteCity, deleteAllCity, getCityByState, getCityByStateSearch} = require("../controllers/cityCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getCity, responseSend)

router.get('/public', getCity, responseSend)

router.get('/:id', staffMiddleware, getCityById, responseSend)

router.post('/addCity', staffMiddleware, addCity, responseSend)

router.put('/updatCity/:id', staffMiddleware, updateCity, responseSend)

router.delete('/deleteCity/:id', staffMiddleware, deleteCity, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllCity, responseSend)

router.get('/cities/:state_id', getCityByState, responseSend)

router.get('/getCityByStateSearch/:text', getCityByStateSearch, responseSend)

module.exports = router