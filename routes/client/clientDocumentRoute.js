const router = require("express").Router();

const {
  getClientDocumentList,
  getByIdClientDocument,
  createClientDocument,
  updateClientDocument,
  deleteClientDocument,
} = require("../../controllers/client/clientDocumentCtrl");
// const { authMiddleware } = require("../../middlewares/authMiddleware");

router.get("/", /* authMiddleware, */ getClientDocumentList);
router.get("/get", /* authMiddleware, */ getByIdClientDocument);
router.post("/add", /* authMiddleware, */ createClientDocument);
router.put("/update/:id", /* authMiddleware, */ updateClientDocument);
router.delete("/delete", /* authMiddleware, */ deleteClientDocument);

module.exports = router;
