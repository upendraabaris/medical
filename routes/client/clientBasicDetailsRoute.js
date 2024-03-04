const router = require("express").Router();

const {
  getClientBasicList,
  getByIdClientBasic,
  getByUserIdClientBasic,
  createClientBasic,
  createClientBasicAdmin,
  updateClientBasic,
  deleteClientBasic,
} = require("../../controllers/client/clientBasicDetailsCtrl");
// const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/", /* authMiddleware, */ getClientBasicList);
router.get("/get", /* authMiddleware, */ getByIdClientBasic);
router.get("/:id", /* isAdmin, */ getByUserIdClientBasic);

router.post("/add", /* authMiddleware, */ createClientBasic);
router.post("/addAdmin", /* isAdmin, */ createClientBasicAdmin);

router.put("/update/:id", /* authMiddleware, */ updateClientBasic);
router.delete("/delete", /* authMiddleware, */ deleteClientBasic);

module.exports = router;
