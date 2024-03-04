const router = require("express").Router()

const {getApi, getApiById, addApi, updateApi, deleteApi} = require("../controllers/apiCtrl")

router.get('/', getApi)

router.get('/:id', getApiById)

router.post('/addApi', addApi)

router.put('/updateApi/:id', updateApi)

router.delete('/deleteApi/:id', deleteApi)

module.exports = router