const router = require("express").Router()

const {getUser, getUserById, addUser, updateUser, deleteUser, pagination, addToFavorites, addFamilyMember, getFamilyMembers, deleteFamilyMember, getProfile, editProfile, userUpdateProfileImage, userTypeUpgrade, getFamilyMembersByStaff, addUserDoc } = require("../../controllers/user/userCtrl")

const {responseSend} = require("../../utils/response")


const { addImage1, downloadDoc} = require("../../controllers/cloudinaryCtrl")

const multer = require("multer");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/gif": "gif"
};

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    // const isValid = MIME_TYPE_MAP[file.mimetype];
    // var error = new Error("Invalid mime type");
    // if (isValid) {
    //   error = null;
    // }
    // callBack(error, "./uploads/");
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


var upload = multer({
  storage: storage,
});



// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getUser, responseSend)

router.get('/getFamilyMembersByStaff/:userId', staffMiddleware, getFamilyMembersByStaff, responseSend)

router.post('/adduser', staffMiddleware, addUser, responseSend)

router.post('/adduser', staffMiddleware, addUser, responseSend)

router.post('/adduser/public', addUser, responseSend)

router.put('/updateuser/:id', staffMiddleware, updateUser, responseSend)

router.put('/updateuser/public/:id', verifyToken, updateUser, responseSend)

router.delete('/deleteuser/:id', staffMiddleware, deleteUser, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

// router.post('/addToFavorites', staffMiddleware, addToFavorites, responseSend)
router.post('/addToFavorites', verifyToken, addToFavorites, responseSend)

router.post('/addfamily', staffMiddleware, addFamilyMember)

router.post('/addfamily/public', verifyToken, addFamilyMember)

router.get('/getprofile/public', verifyToken, getProfile, responseSend)

router.put('/editProfile/public', verifyToken, editProfile, responseSend)

router.put('/editProfile/public/:id', verifyToken, editProfile, responseSend)

router.post('/UpdateProfileImage/public', verifyToken, upload.single('image'), userUpdateProfileImage, responseSend)

router.post('/UpdateProfileImage/:userId', staffMiddleware, upload.single('image'), userUpdateProfileImage, responseSend)

router.put('/userTypeUpgrade/public/:userId', verifyToken, userTypeUpgrade)

router.get('/getFamilyMembers/public', verifyToken, getFamilyMembers)
router.delete('/deleteFamilyMember/public', /* verifyToken, */ deleteFamilyMember)

// router.post("/uploadDoc", uploadDoc)


router.post("/addImage1", upload.single("image"), addImage1)
router.post('/submitDocument', verifyToken, addUserDoc)

router.get("/downloadDoc/:filename", /* upload.single("image"), */ downloadDoc)


router.get('/:id', staffMiddleware, getUserById, responseSend)




module.exports = router