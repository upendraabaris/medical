const router = require("express").Router()
const {getCity, getCityById, addCity, updateCity, deleteCity, getCityMapping} = require("../controllers/cityCtrl")
const {responseSend} = require("../utils/response")

router.get('/',  getCity, responseSend)

router.get('/getCityMapping', getCityMapping, responseSend)

router.get('/:id', getCityById, responseSend)

router.post('/addCity', addCity, responseSend)

router.put('/updatCity/:id', updateCity, responseSend)

router.delete('/deleteCity/:id', deleteCity, responseSend)



module.exports = router