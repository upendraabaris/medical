const router = require("express").Router()

const {getSellerUser, getSellerUserById, addSellerUser, updateSellerUser, deleteSellerUser, pagination, loginSellerUser, forgotPasswordChange, addUser, getPatientUserByMobile} = require("../../controllers/ecommerce/sellerUserCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/user/:id', /* staffMiddleware, */ getSellerUser, responseSend)

router.get('/:id', staffMiddleware, getSellerUserById, responseSend)

router.post('/addSellerUser', /* staffMiddleware, */ addSellerUser, responseSend)

router.put('/updateSellerUser', /* staffMiddleware, */ updateSellerUser, responseSend)

router.delete('/deleteSellerUser/:id', staffMiddleware, deleteSellerUser, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

router.post('/login', loginSellerUser, responseSend)

router.post('/firstchangePassword', forgotPasswordChange, responseSend)

router.post('/addpatientuser/public/add', addUser, responseSend)

router.get('/getpatientuser/:mobile', getPatientUserByMobile, responseSend)

module.exports = router