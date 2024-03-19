const router = require("express").Router()

const {getServiceProductCategory, getServiceProductCategoryById, addServiceProductCategory, updateServiceProductCategory, deleteServiceProductCategory} = require("../../controllers/service/serviceProductCategoryCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getServiceProductCategory, responseSend)

router.get('/:id', verifyToken, getServiceProductCategoryById, responseSend)

router.post('/addServiceProductCategory', verifyToken, addServiceProductCategory, responseSend)

router.put('/updateServiceProductCategory/:id', verifyToken, updateServiceProductCategory, responseSend)

router.delete('/deleteServiceProductCategory/:id', verifyToken, deleteServiceProductCategory, responseSend)

module.exports = router