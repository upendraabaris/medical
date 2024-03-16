const router = require("express").Router()

const {getBusinessPartner, getBusinessPartnerById, addBusinessPartner, updateBusinessPartner, deleteBusinessPartner} = require("../controllers/businessPartnerCtrl")

const {responseSend} = require("../utils/response")

router.get('/', getBusinessPartner, responseSend)

router.get('/:id', getBusinessPartnerById, responseSend)

router.post('/addBusinessPartner', addBusinessPartner, responseSend)

router.put('/updateBusinessPartner/:id', updateBusinessPartner, responseSend)

router.delete('/deleteBusinessPartner/:id', deleteBusinessPartner, responseSend)

module.exports = router