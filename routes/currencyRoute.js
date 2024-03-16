const router = require("express").Router()
const {getCurrency, getCurrencyById, addCurrency, updateCurrency, deleteCurrency} = require("../controllers/currencyCtrl")

const {responseSend} = require("../utils/response")

router.get('/',  getCurrency, responseSend)

router.get('/:id', getCurrencyById, responseSend)

router.post('/addcurrency', addCurrency, responseSend)

router.put('/updatcurrency/:id', updateCurrency, responseSend)

router.delete('/deletecurrency/:id', deleteCurrency, responseSend)

module.exports = router