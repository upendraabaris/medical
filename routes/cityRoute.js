const router = require("express").Router()
const {getCity, getCityById, addCity, updateCity, deleteCity, getCityMapping} = require("../controllers/cityCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getCity, responseSend)

router.get('/getCityMapping', verifyToken, getCityMapping, responseSend)

router.get('/:id', verifyToken, getCityById, responseSend)

router.post('/addCity', verifyToken, addCity, responseSend)

router.put('/updatCity/:id', verifyToken, updateCity, responseSend)

router.delete('/deleteCity/:id', verifyToken, deleteCity, responseSend)


module.exports = router