const router = require("express").Router();

const {
  getClientEducationList,
  getByIdClientEducation,
  getByUserIdClientEducation,
  createClientEducation,
  createClientEducationAdmin,
  updateClientEducation,
  deleteClientEducation,
} = require("../../controllers/client/clientEducationCtrl");
// const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/", /* authMiddleware, */ getClientEducationList);

router.get("/get", /* authMiddleware, */ getByIdClientEducation);
router.get("/:id", /* isAdmin, */ getByUserIdClientEducation);

router.post("/add", /* authMiddleware, */ createClientEducation);
router.post("/addAdmin", /* isAdmin, */ createClientEducationAdmin);

router.put("/update/:id", /* authMiddleware, */ updateClientEducation);
router.delete("/delete", /* authMiddleware, */ deleteClientEducation);

module.exports = router;
