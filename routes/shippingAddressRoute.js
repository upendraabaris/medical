const router = require("express").Router();

const {
  getshippingAddressList,
  createshippingAddressBySeller,
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
  createShippingAddressByCustomer,
  updateShippingAddressByCustomer,
  deleteShippingAddressByCustomer
} = require("../controllers/shippingAddressCtrl");

const { authMiddleware, isAdmin, verifyToken, staffMiddleware } = require("../middleware/authMiddleware");

router.get("/", /* staffMiddleware, */ getshippingAddressList);
router.post("/add_shippingAddresss", /* isAdmin, */ createshippingAddressBySeller);
router.put("/update_shippingAddresss/:id", /* isAdmin, */ updateshippingAddress);
router.put("/delete_shippingAddresss/:id", /* isAdmin, */ deleteshippingAddress);
router.delete("/delete_shippingAddresss/:id", /* isAdmin, */ deleteshippingAddress);
router.get("/search_shippingAddress/:search", /* isAdmin, */ getSearchshippingAddress);

router.get("/customer/shipping", /* authMiddleware, */ getOnlyshippingAddressListCustomerId);



router.get("/billing/seller/:id", /* isAdmin, */ getBillingAddBySeller);
router.get("/shipping/seller/:id", /* isAdmin, */ getShippingAddBySeller);

// router.get("/billing/user/:id", /* isAdmin, */ getbillingAddressListByCustomerId);
// router.get("/shipping/user/:id", /* isAdmin, */ getshippingAddressListByCustomerId);

router.get("/customer/public", verifyToken, getshippingAddressListCustomerId);
router.post('/addShippingAddressByCustomer/public', verifyToken, createShippingAddressByCustomer)
router.put('/updateShippingAddressByCustomer/public/:id', verifyToken, updateShippingAddressByCustomer)
router.delete('/deleteShippingAddressByCustomer/public/:id', verifyToken, deleteShippingAddressByCustomer)

router.get("/shipping/user/:id", staffMiddleware, getshippingAddressListCustomerId);
router.get("/billing/user/:id", staffMiddleware, getbillingAddressListByCustomerId);
router.post('/addShippingAddress', staffMiddleware, createShippingAddressByCustomer)
router.put('/updateShippingAddress/:id', staffMiddleware, updateShippingAddressByCustomer)
router.delete('/deleteShippingAddress/:id', staffMiddleware, deleteshippingAddress)


router.get("/:id", /* authMiddleware, */ getSearchById);

module.exports = router;
