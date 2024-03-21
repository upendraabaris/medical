const router = require("express").Router()
const {getFinance, getFinanceById, addFinance, updateFinance, deleteFinance} = require("../controllers/financeCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getFinance, responseSend)

router.get('/:id', staffMiddleware, getFinanceById, responseSend)

router.post('/addFinance', staffMiddleware, addFinance, responseSend)

router.put('/updateFinance/:id', staffMiddleware, updateFinance, responseSend)

router.delete('/deleteFinance/:id', staffMiddleware, deleteFinance, responseSend)

module.exports = router