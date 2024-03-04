const router = require("express").Router()

const {getClientType, getClientTypeById, addClientType, updateClientType, deleteClientType} = require("../../controllers/client/clientTypeCtrl")

router.get('/', getClientType)

router.get('/:id', getClientTypeById)

router.post('/addClientType', addClientType)

router.put('/updateClientType/:id', updateClientType)

router.delete('/deleteClientType/:id', deleteClientType)

module.exports = router