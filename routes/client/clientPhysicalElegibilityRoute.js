const router = require("express").Router();

const {
  getClientElegibilityList,
  getByIdClientElegibility,
  getByUserIdClientElegibility,
  createClientElegibility,
  createClientElegibilityAdmin,
  updateClientElegibility,
  deleteClientElegibility,
} = require("../../controllers/client/clientPhysicalElegibilityCtrl");
// const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/", /* authMiddleware, */ getClientElegibilityList);

router.get("/get", /* authMiddleware, */ getByIdClientElegibility);
router.get("/:id", /* isAdmin, */ getByUserIdClientElegibility);

router.post("/add", /* authMiddleware, */ createClientElegibility);
router.post("/addAdmin", /* isAdmin, */ createClientElegibilityAdmin);
router.put("/update/:id", /* authMiddleware, */ updateClientElegibility);
router.delete("/delete", /* authMiddleware, */ deleteClientElegibility);

module.exports = router;
