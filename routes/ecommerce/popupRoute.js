const express = require("express");
const {
  createPopup,
  updatePopup,
  deletePopup,
  getPopup,
  getallPopup,
  getPopupPublic,
  statusPopup
} = require("../controller/popupCtrl");
const {} = require("../middlewares/authMiddleware");
const router = express.Router();

const multer = require("multer");
const path = require("path");

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
const { isAdmin, checkDomain } = require("../middlewares/authMiddleware");

router.post("/add_Popup", isAdmin, upload.single("image"), createPopup);
router.put("/update_Popup/:id", isAdmin, upload.single("image"), updatePopup);
router.delete("/delete_Popup/:id", isAdmin, deletePopup);
router.post("/updateStatus", isAdmin, statusPopup);
router.get("/public", checkDomain, getPopupPublic);
router.get("/admin", isAdmin, getallPopup);
router.get("/:id", isAdmin, getPopup);

module.exports = router;
