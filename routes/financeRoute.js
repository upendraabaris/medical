const router = require("express").Router()
const {getFinance, getFinanceById, addFinance, updateFinance, deleteFinance} = require("../controllers/financeCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getFinance, responseSend)

router.get('/:id', verifyToken, getFinanceById, responseSend)

router.post('/addFinance', verifyToken, addFinance, responseSend)

router.put('/updateFinance/:id', verifyToken, updateFinance, responseSend)

router.delete('/deleteFinance/:id', verifyToken, deleteFinance, responseSend)

module.exports = router