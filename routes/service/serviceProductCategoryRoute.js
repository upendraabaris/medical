const router = require("express").Router()

const {getServiceProductCategory, getServiceProductCategoryById, addServiceProductCategory, updateServiceProductCategory, deleteServiceProductCategory} = require("../../controllers/service/serviceProductCategoryCtrl")

router.get('/', getServiceProductCategory)

router.get('/:id', getServiceProductCategoryById)

router.post('/addServiceProductCategory', addServiceProductCategory)

router.put('/updateServiceProductCategory/:id', updateServiceProductCategory)

router.delete('/deleteServiceProductCategory/:id', deleteServiceProductCategory)

module.exports = router