const router = require("express").Router()

const {getClient, getClientById, addClient, updateClient, deleteClient} = require("../../controllers/client/clientCtrl")

const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getClient)

router.get('/:id', staffMiddleware, getClientById)

router.post('/addClient', staffMiddleware, addClient)

router.put('/updateClient/:id', staffMiddleware, updateClient)

router.delete('/deleteClient/:id', staffMiddleware, deleteClient)

module.exports = router