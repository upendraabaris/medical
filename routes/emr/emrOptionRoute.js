const router = require("express").Router()

const {getEmrOption, getEmrOptionById, addEmrOption, updateEmrOption, deleteEmrOption} = require("../../controllers/emr/emrOptionCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getEmrOption)

router.get('/:id', verifyToken, getEmrOptionById)

router.post('/addEmrOption', verifyToken, addEmrOption)

router.put('/updateEmrOption/:id', verifyToken, updateEmrOption)

router.delete('/deleteEmrOption/:id', verifyToken, deleteEmrOption)

module.exports = router