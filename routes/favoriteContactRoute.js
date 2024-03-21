const router = require("express").Router()
const {getFavoriteContact, getFavoriteContactById, addFavoriteContact, updateFavoriteContact, deleteFavoriteContact} = require("../controllers/favoriteContactCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getFavoriteContact, responseSend)

router.get('/:id', staffMiddleware, getFavoriteContactById, responseSend)

router.post('/addFavoriteContact', staffMiddleware, addFavoriteContact, responseSend)

router.put('/updateFavoriteContact/:id', staffMiddleware, updateFavoriteContact, responseSend)

router.delete('/deleteFavoriteContact/:id', staffMiddleware, deleteFavoriteContact, responseSend)

module.exports = router