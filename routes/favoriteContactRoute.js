const router = require("express").Router()
const {getFavoriteContact, getFavoriteContactById, addFavoriteContact, updateFavoriteContact, deleteFavoriteContact, checkMobileNumber, createSeller, addFavoriteContactByPublic, getFavoriteContactByType} = require("../controllers/favoriteContactCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

router.get('/public/sellertype/:id', verifyToken, getFavoriteContactByType, responseSend)
router.get('/', staffMiddleware, getFavoriteContact, responseSend)

router.get('/public/user/:id', /* verifyToken, */ getFavoriteContact, responseSend)

router.get('/:id', staffMiddleware, getFavoriteContactById, responseSend)

router.post('/addFavoriteContact', staffMiddleware, addFavoriteContact, responseSend)

router.post('/addFavoriteContact/public/user', verifyToken, addFavoriteContact, responseSend)

router.post('/addFavoriteContact/public', verifyToken, addFavoriteContactByPublic, responseSend)

router.put('/updateFavoriteContact/:id', staffMiddleware, updateFavoriteContact, responseSend)

router.delete('/deleteFavoriteContact/:id', staffMiddleware, deleteFavoriteContact, responseSend)

router.delete('/deleteFavoriteContact/public/:id', verifyToken, deleteFavoriteContact, responseSend)

router.post('/checkMobileNumber', checkMobileNumber, responseSend)

router.post('/addFavoriteSeller/public/user', verifyToken, createSeller, responseSend)


module.exports = router