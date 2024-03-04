const router = require("express").Router()
const {getCountry, getCountryById, addCountry, updateCountry, deleteCountry} = require("../controllers/countryCtrl")

router.get('/',  getCountry)

router.get('/:id', getCountryById)

router.post('/addCountry', addCountry)

router.put('/updatCountry/:id', updateCountry)

router.delete('/deleteCountry/:id', deleteCountry)

module.exports = router