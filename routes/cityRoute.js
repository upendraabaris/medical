const router = require("express").Router()
const {getCity, getCityById, addCity, updateCity, deleteCity} = require("../controllers/cityCtrl")

router.get('/',  getCity)

router.get('/:id', getCityById)

router.post('/addCity', addCity)

router.put('/updatCity/:id', updateCity)

router.delete('/deleteCity/:id', deleteCity)

module.exports = router