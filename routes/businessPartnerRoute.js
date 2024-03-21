const router = require("express").Router()

const {getBusinessPartner, getBusinessPartnerById, addBusinessPartner, updateBusinessPartner, deleteBusinessPartner} = require("../controllers/businessPartnerCtrl")

const {responseSend} = require("../utils/response")

const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getBusinessPartner, responseSend)

router.get('/:id', staffMiddleware, getBusinessPartnerById, responseSend)

router.post('/addBusinessPartner', staffMiddleware, addBusinessPartner, responseSend)

router.put('/updateBusinessPartner/:id', staffMiddleware, updateBusinessPartner, responseSend)

router.delete('/deleteBusinessPartner/:id', staffMiddleware, deleteBusinessPartner, responseSend)

module.exports = router