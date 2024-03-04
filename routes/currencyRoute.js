const router = require("express").Router()
const {getCurrency, getCurrencyById, addCurrency, updateCurrency, deleteCurrency} = require("../controllers/currencyCtrl")

router.get('/',  getCurrency)

router.get('/:id', getCurrencyById)

router.post('/addcurrency', addCurrency)

router.put('/updatcurrency/:id', updateCurrency)

router.delete('/deletecurrency/:id', deleteCurrency)

module.exports = router