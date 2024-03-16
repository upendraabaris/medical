const router = require("express").Router()

const {getApi, getApiById, addApi, updateApi, deleteApi} = require("../controllers/apiCtrl")

const {responseSend} = require("../utils/response")

router.get('/', getApi, responseSend)

router.get('/:id', getApiById, responseSend)

router.post('/addApi', addApi, responseSend)

router.put('/updateApi/:id', updateApi, responseSend)

router.delete('/deleteApi/:id', deleteApi, responseSend)

module.exports = router