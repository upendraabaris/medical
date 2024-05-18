const router = require("express").Router()
const {getVideoGallery, getVideoGalleryById, addVideoGallery, updateVideoGallery, deleteVideoGallery, deleteAllVideoGallery, getVideoGalleryBySellerId} = require("../../controllers/ecommerce/sellerVideoGalleryCtrl")
const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

const { addImage1, downloadDoc} = require("../../controllers/cloudinaryCtrl")

const multer = require("multer");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/mpeg": "mpeg",
};

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
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
      MIME_TYPE_MAP[file.mimetype] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


var upload = multer({
  storage: storage,
});


router.get('/', staffMiddleware, getVideoGallery, responseSend)

router.get('/public', getVideoGallery, responseSend)

router.post('/addVideoGallery', staffMiddleware, addVideoGallery, responseSend)

router.put('/updateVideoGallery/:id', staffMiddleware, updateVideoGallery, responseSend)

router.delete('/deleteVideoGallery/:id', staffMiddleware, deleteVideoGallery, responseSend)

router.get('/getVideoGalleryBySellerId/:id', verifyToken, getVideoGalleryBySellerId, responseSend)

router.get('/getVideoGalleryBySellerId/admin/:id', staffMiddleware, getVideoGalleryBySellerId, responseSend)

router.post("/addImage1", upload.single("image"), addImage1)
router.get("/downloadDoc/:filename", /* upload.single("image"), */ downloadDoc)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllVideoGallery, responseSend)
router.get('/:id', staffMiddleware, getVideoGalleryById, responseSend)

module.exports = router