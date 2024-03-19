const router = require("express").Router()
const {getCurrency, getCurrencyById, addCurrency, updateCurrency, deleteCurrency} = require("../controllers/currencyCtrl")

const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken,  getCurrency, responseSend)

router.get('/:id', verifyToken, getCurrencyById, responseSend)

router.post('/addcurrency', verifyToken, addCurrency, responseSend)

router.put('/updatcurrency/:id', verifyToken, updateCurrency, responseSend)

router.delete('/deletecurrency/:id', verifyToken, deleteCurrency, responseSend)

module.exports = router