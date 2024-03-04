const router = require("express").Router();

const {
  getshippingAddressList,
  createshippingAddress,
  updateshippingAddress,
  deleteshippingAddress,
  getSearchshippingAddress,
  getSearchById,
  getshippingAddressListCustomerId,
  getOnlyshippingAddressListCustomerId,
  getBillingAddBySeller,
  getShippingAddBySeller,
  getbillingAddressListByCustomerId,
  getshippingAddressListByCustomerId,
} = require("../controllers/shippingAddressCtrl");

// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", /* isAdmin, */ getshippingAddressList);
router.post("/add_shippingAddresss", /* isAdmin, */ createshippingAddress);
router.put("/update_shippingAddresss/:id", /* isAdmin, */ updateshippingAddress);
router.put("/delete_shippingAddresss/:id", /* isAdmin, */ deleteshippingAddress);
router.delete("/delete_shippingAddresss/:id", /* isAdmin, */ deleteshippingAddress);
router.get("/:id", /* authMiddleware, */ getSearchById);
router.get("/search_shippingAddress/:search", /* isAdmin, */ getSearchshippingAddress);

router.get("/customer", /* authMiddleware, */ getshippingAddressListCustomerId);
router.get("/customer/shipping", /* authMiddleware, */ getOnlyshippingAddressListCustomerId);



router.get("/billing/seller/:id", /* isAdmin, */ getBillingAddBySeller);
router.get("/shipping/seller/:id", /* isAdmin, */ getShippingAddBySeller);

router.get("/billing/user/:id", /* isAdmin, */ getbillingAddressListByCustomerId);
router.get("/shipping/user/:id", /* isAdmin, */ getshippingAddressListByCustomerId);


module.exports = router;
