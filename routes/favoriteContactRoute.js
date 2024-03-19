const router = require("express").Router()
const {getFavoriteContact, getFavoriteContactById, addFavoriteContact, updateFavoriteContact, deleteFavoriteContact} = require("../controllers/favoriteContactCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getFavoriteContact, responseSend)

router.get('/:id', verifyToken, getFavoriteContactById, responseSend)

router.post('/addFavoriteContact', verifyToken, addFavoriteContact, responseSend)

router.put('/updateFavoriteContact/:id', verifyToken, updateFavoriteContact, responseSend)

router.delete('/deleteFavoriteContact/:id', verifyToken, deleteFavoriteContact, responseSend)

module.exports = router