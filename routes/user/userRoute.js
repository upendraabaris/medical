const router = require("express").Router()

const {getUser, getUserById, addUser, updateUser, deleteUser, pagination, addToFavorites, addFamilyMember, getFamilyMembers, deleteFamilyMember, getProfile, editProfile} = require("../../controllers/user/userCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getUser, responseSend)

// router.get('/getFamilyMembers', verifyToken, getFamilyMembers, responseSend)
router.get('/getFamilyMembers', verifyToken, getFamilyMembers, responseSend)

router.post('/adduser', staffMiddleware, addUser, responseSend)

router.post('/adduser', staffMiddleware, addUser, responseSend)

router.post('/adduser/public', addUser, responseSend)

router.put('/updateuser/:id', staffMiddleware, updateUser, responseSend)

router.delete('/deleteuser/:id', staffMiddleware, deleteUser, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

// router.post('/addToFavorites', staffMiddleware, addToFavorites, responseSend)
router.post('/addToFavorites', verifyToken, addToFavorites, responseSend)

router.post('/addfamily', staffMiddleware, addFamilyMember)

router.post('/addfamily/public', verifyToken, addFamilyMember)

router.get('/getprofile/public', verifyToken, getProfile, responseSend)

router.put('/editProfile/public', verifyToken, editProfile, responseSend)

router.get('/:id',staffMiddleware, getUserById, responseSend)

router.delete('/deleteFamilyMember/:memberId', verifyToken, deleteFamilyMember)


module.exports = router