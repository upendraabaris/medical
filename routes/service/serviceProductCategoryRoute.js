const router = require("express").Router()

const {getServiceProductCategory, getServiceProductCategoryById, addServiceProductCategory, updateServiceProductCategory, deleteServiceProductCategory} = require("../../controllers/service/serviceProductCategoryCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getServiceProductCategory, responseSend)

router.get('/:id', staffMiddleware, getServiceProductCategoryById, responseSend)

router.post('/addServiceProductCategory', staffMiddleware, addServiceProductCategory, responseSend)

router.put('/updateServiceProductCategory/:id', staffMiddleware, updateServiceProductCategory, responseSend)

router.delete('/deleteServiceProductCategory/:id', staffMiddleware, deleteServiceProductCategory, responseSend)

module.exports = router