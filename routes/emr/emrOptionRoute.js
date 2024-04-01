const router = require("express").Router()

const {getEmrOption, getEmrOptionById, addEmrOption, updateEmrOption, deleteEmrOption} = require("../../controllers/emr/emrOptionCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getEmrOption)

router.get('/:id', staffMiddleware, getEmrOptionById)

router.post('/addEmrOption', /* staffMiddleware, */ addEmrOption)

router.put('/updateEmrOption/:id', staffMiddleware, updateEmrOption)

router.delete('/deleteEmrOption/:id', staffMiddleware, deleteEmrOption)

module.exports = router