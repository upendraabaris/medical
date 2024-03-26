const router = require("express").Router()
const {getCurrency, getCurrencyById, addCurrency, updateCurrency, deleteCurrency, deleteAllCurrency} = require("../controllers/currencyCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware,  getCurrency, responseSend)

router.get('/:id', staffMiddleware, getCurrencyById, responseSend)

router.post('/addcurrency', staffMiddleware, addCurrency, responseSend)

router.put('/updatcurrency/:id', staffMiddleware, updateCurrency, responseSend)

router.delete('/deletecurrency/:id', staffMiddleware, deleteCurrency, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllCurrency, responseSend)

module.exports = router