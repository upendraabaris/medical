const router = require("express").Router()

const {getServiceProductCategory, getServiceProductCategoryById, addServiceProductCategory, updateServiceProductCategory, deleteServiceProductCategory} = require("../../controllers/service/serviceProductCategoryCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getServiceProductCategory, responseSend)

router.get('/:id', getServiceProductCategoryById, responseSend)

router.post('/addServiceProductCategory', addServiceProductCategory, responseSend)

router.put('/updateServiceProductCategory/:id', updateServiceProductCategory, responseSend)

router.delete('/deleteServiceProductCategory/:id', deleteServiceProductCategory, responseSend)

module.exports = router