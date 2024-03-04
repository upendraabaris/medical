const router = require("express").Router()

const {getBusinessPartner, getBusinessPartnerById, addBusinessPartner, updateBusinessPartner, deleteBusinessPartner} = require("../controllers/businessPartnerCtrl")

router.get('/', getBusinessPartner)

router.get('/:id', getBusinessPartnerById)

router.post('/addBusinessPartner', addBusinessPartner)

router.put('/updateBusinessPartner/:id', updateBusinessPartner)

router.delete('/deleteBusinessPartner/:id', deleteBusinessPartner)

module.exports = router