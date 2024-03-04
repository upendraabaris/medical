const router = require("express").Router();

const {
  getClientOtherList,
  getByIdClientOther,
  getByUserIdClientOther,
  createClientOther,
  createClientOtherAdmin,
  updateClientOther,
  deleteClientOther,
} = require("../../controllers/client/clientOtherDetailsCtrl");
// const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/", /* authMiddleware, */ getClientOtherList);
router.get("/get", /* authMiddleware, */ getByIdClientOther);
router.get("/:id", /* isAdmin, */ getByUserIdClientOther);
router.post("/add", /* authMiddleware, */ createClientOther);
router.post("/addAdmin", /* authMiddleware, */ createClientOtherAdmin);
router.put("/update/:id", /* authMiddleware, */ updateClientOther);
router.delete("/delete", /* authMiddleware, */ deleteClientOther);

module.exports = router;
