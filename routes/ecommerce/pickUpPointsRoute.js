const express = require("express");

const {
  getPickupPointsList,
  getPickupPointsListByLang,
  getByIdPickupPoints,
  createPickupPoints,
  updatePickupPoints,
  deletePickupPoints,
  pickupPointsCount,
  getallPickupPointsPagination,
  pickupPointsListForStaff
} = require("../controller/pickupPointsCtrl");

const { isAdmin, authMiddleware, checkDomain } = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/add", isAdmin,createPickupPoints);
router.put("/:id", isAdmin, updatePickupPoints);
router.delete("/:id", isAdmin,deletePickupPoints);
router.get("/count", isAdmin,pickupPointsCount);
router.get("/page/:page", checkDomain, getallPickupPointsPagination);
router.get("/admin", isAdmin, getPickupPointsList);
router.get("/:id", isAdmin, getByIdPickupPoints);
router.get("/public/:id", checkDomain, getByIdPickupPoints);
router.get("/", checkDomain, getPickupPointsList);
router.get("/lang/:id", isAdmin, getPickupPointsListByLang);
router.get("/Staff/:id", isAdmin, pickupPointsListForStaff);
//router.get("/search/:search", getSearchPickupPoints);

module.exports = router;
