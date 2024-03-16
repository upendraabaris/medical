const router = require("express").Router()
const {getFinance, getFinanceById, addFinance, updateFinance, deleteFinance} = require("../controllers/financeCtrl")
const {responseSend} = require("../utils/response")

router.get('/', getFinance, responseSend)

router.get('/:id', getFinanceById, responseSend)

router.post('/addFinance', addFinance, responseSend)

router.put('/updateFinance/:id', updateFinance, responseSend)

router.delete('/deleteFinance/:id', deleteFinance, responseSend)

module.exports = router