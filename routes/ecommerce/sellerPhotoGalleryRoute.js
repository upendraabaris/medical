const router = require("express").Router()
const {getPhotoGallery, getPhotoGalleryById, addPhotoGallery, updatePhotoGallery, deletePhotoGallery, deleteAllPhotoGallery,getPhotoGallerySeller, getPhotoGalleryBySellerId} = require("../../controllers/ecommerce/sellerPhotoGalleryCtrl")
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

router.get('/', staffMiddleware, getPhotoGallery, responseSend)

router.get('/public', getPhotoGallery, responseSend)

router.post('/addPhotoGallery', staffMiddleware, addPhotoGallery, responseSend)

router.get('/getPhotoGallery/:id', staffMiddleware, getPhotoGalleryById, responseSend)

router.get('/getPhotoGalleryBySellerId/:id', verifyToken, getPhotoGalleryBySellerId, responseSend)

router.get('/getPhotoGalleryBySellerId/admin/:id', staffMiddleware, getPhotoGalleryBySellerId, responseSend)

router.put('/updatePhotoGallery/:id', staffMiddleware, updatePhotoGallery, responseSend)

router.delete('/deletePhotoGallery/:id', staffMiddleware, deletePhotoGallery, responseSend)

router.get('/getPhotoGallerySeller', getPhotoGallerySeller, responseSend)

router.post("/addImage1", upload.single("image"), addImage1)
router.get("/downloadDoc/:filename", /* upload.single("image"), */ downloadDoc)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllPhotoGallery, responseSend)
router.get('/:id', staffMiddleware, getPhotoGalleryById, responseSend)

module.exports = router