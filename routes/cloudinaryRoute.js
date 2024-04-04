const router = require("express").Router();

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


const { addImage, addImage1, downloadDoc } = require("../controllers/cloudinaryCtrl");

const { isAdmin, checkDomain } = require("../middleware/authMiddleware");

router.post("/addImage", upload.single("image"), addImage);
router.post("/addImage1", upload.single("image"), addImage1);

router.get("/downloadDoc/:filename", /* upload.single("image"), */ downloadDoc);

module.exports = router;
