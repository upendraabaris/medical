const router = require("express").Router();

const {
  getOtherDocumentList,
  getByIdOtherDocument,
  getByUserIdOtherDocument,
  createOtherDocument,
  createOtherDocumentAdmin,
  updateOtherDocument,
  deleteOtherDocument,
} = require("../../controllers/client/clientOtherDocumentCtrl");
// const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/", /* authMiddleware, */ getOtherDocumentList);
router.get("/get", /* authMiddleware, */ getByIdOtherDocument);
router.get("/:id", /* isAdmin, */ getByUserIdOtherDocument);

router.post("/add", /* authMiddleware, */ createOtherDocument);
router.post("/addAdmin", /* authMiddleware, */ createOtherDocumentAdmin);

router.put("/update/:id", /* authMiddleware, */ updateOtherDocument);
router.delete("/delete", /* authMiddleware, */ deleteOtherDocument);

module.exports = router;
