const router = require("express").Router()
const {getDesignation, getDesignationById, addDesignation, updateDesignation, deleteDesignation} = require("../controllers/designationCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getDesignation, responseSend)

router.get('/:id', staffMiddleware, getDesignationById, responseSend)

router.post('/addDesignation', staffMiddleware, addDesignation, responseSend)

router.put('/updateDesignation/:id', staffMiddleware, updateDesignation, responseSend)

router.delete('/deleteDesignation/:id', staffMiddleware, deleteDesignation, responseSend)

module.exports = router