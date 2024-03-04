const router = require("express").Router();

const {
  getClientCarriculamList,
  getByIdClientCarriculam,
  getByUserIdClientCarriculam,
  createClientCarriculam,
  createClientCarriculamAdmin,
  updateClientCarriculam,
  deleteClientCarriculam,
} = require("../../controllers/client/clientCarriculamCtrl");
// const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/", /* authMiddleware, */ getClientCarriculamList);
router.get("/get", /* authMiddleware, */ getByIdClientCarriculam);
router.get("/:id", /* isAdmin, */ getByUserIdClientCarriculam);
router.post("/add", /* authMiddleware, */ createClientCarriculam);
router.post("/addAdmin", /* isAdmin, */ createClientCarriculamAdmin);
router.put("/update/:id", /* authMiddleware, */ updateClientCarriculam);
router.delete("/delete", /* authMiddleware, */ deleteClientCarriculam);

module.exports = router;
