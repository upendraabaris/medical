const router = require("express").Router()

const {getFinance, getFinanceById, addFinance, updateFinance, deleteFinance} = require("../controllers/financeCtrl")

router.get('/', getFinance)

router.get('/:id', getFinanceById)

router.post('/addFinance', addFinance)

router.put('/updateFinance/:id', updateFinance)

router.delete('/deleteFinance/:id', deleteFinance)

module.exports = router