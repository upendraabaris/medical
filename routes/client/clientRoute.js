const router = require("express").Router()

const {getClient, getClientById, addClient, updateClient, deleteClient} = require("../../controllers/client/clientCtrl")

router.get('/', getClient)

router.get('/:id', getClientById)

router.post('/addClient', addClient)

router.put('/updateClient/:id', updateClient)

router.delete('/deleteClient/:id', deleteClient)

module.exports = router