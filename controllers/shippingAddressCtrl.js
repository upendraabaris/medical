const shippingAddress = require("../models/shippingAddressModel");
// const asyncHandler = require("express-async-handler");
const User = require("../models/user/userModel");

const getshippingAddressList = (async (req, res) => {
  try {
    const allshippingAddresss = await shippingAddress.find();
    res.json(allshippingAddresss);
  } catch (error) {
    throw new Error(error);
  }
});

const getshippingAddressListCustomerId = (async (req, res) => {
  try {
    const allShippinAddress = await shippingAddress.find({
      user_id: req.user || req.params.id,
    });
    res.json(allShippinAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const getshippingAddressListByCustomerId = (async (req, res) => {
  try {
    const allShippinAddress = await shippingAddress.find({
      userid: req.params.id,
      type: "shipping"
    });
    res.json(allShippinAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const getbillingAddressListByCustomerId = (async (req, res) => {
  try {
    const allShippinAddress = await shippingAddress.find({
      userid: req.params.id,
      type: "billing"
    });
    res.json(allShippinAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const getOnlyshippingAddressListCustomerId = (async (req, res) => {
  try {
    const getUser = await User.findById(req.user._id);

    let billAddress = await shippingAddress
      .find({
        userid: req.user._id,
        type: "shipping",
      })
      .lean();

      billAddress.find((id) => {
      if (String(id._id) == String(getUser.selectedBillingAddress)) {
        id.active = true;
      }

    });
    if (getUser == null) {
      return res.status(401).json("You are not Authorize");
    } else {
      res.json({ address: billAddress });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createshippingAddressBySeller = (async (req, res) => {
  try {
    req.body.seller_id = req.user._id;
    const sellers = await shippingAddress.create(req.body);
    res.json(sellers);
  } catch (error) {
    throw new Error(error);
  }
});

const createShippingAddressByCustomer = (async (req, res) => {
  try {
    req.body.user_id = req.user;
    console.log(req.user)
    const sellers = await shippingAddress.create(req.body);
    res.json(sellers);
  } catch (error) {
    throw new Error(error);
  }
});

const updateshippingAddress = (async (req, res) => {
  try {
    const { id } = req.params;
    const updatedshippingAddress = await shippingAddress.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedshippingAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteshippingAddress = (async (req, res) => {
  try {
    const { id } = req.params;
    const deletedshippingAddress = await shippingAddress.findByIdAndDelete(id);
    res.json(deletedshippingAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteShippingAddressByCustomer = (async (req, res) => {
  try {
    const { id } = req.params;
    const deletedshippingAddress = await shippingAddress.findOneAndDelete({_id: id, user_id:req.user});
    res.json(deletedshippingAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const updateShippingAddressByCustomer = (async (req, res) => {
  try {
    const { id } = req.params;
    const updateshippingAddress = await shippingAddress.findOneAndUpdate({_id: id, user_id:req.user}, req.body, { new: true });
    res.json(updateshippingAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchshippingAddress = (async (req, res) => {
  try {
    const getSearchedshippingAddress = await shippingAddress.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedshippingAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchById = (async (req, res) => {
  try {
    const { id } = req.params;
    if(req.type == "Delivery") {
      throw new Error("You are not Authorize");
    }
    const getaSearch = await shippingAddress.findById(id);
    if(req.type == "User" && String(getaSearch.userid) != String(req.user._id) ) {
      throw new Error("You are not Authorize");
    }
    res.json(getaSearch);
  } catch (error) {
    throw new Error(error);
  }
});

const getShippingAddBySeller = (async (req, res) => {
  try {
    const shipp = await shippingAddress.find({ seller_id: req.params.id, type: 'shipping' });
    res.json(shipp);
  }
  catch(error) {
    throw new Error(error);
  }
});

const getBillingAddBySeller = (async (req, res) => {
  try {
    const shipp = await shippingAddress.find({ seller_id: req.params.id, type: 'billing' });
    res.json(shipp);
  }
  catch(error) {
    throw new Error(error);
  }
});



module.exports = {
  getshippingAddressList,
  createshippingAddressBySeller,
  updateshippingAddress,
  deleteshippingAddress,
  getSearchshippingAddress,
  getSearchById,
  getshippingAddressListCustomerId,
  getOnlyshippingAddressListCustomerId,
  getShippingAddBySeller,
  getBillingAddBySeller,
  
  getbillingAddressListByCustomerId,
  getshippingAddressListByCustomerId,

  createShippingAddressByCustomer,
  updateShippingAddressByCustomer,
  deleteShippingAddressByCustomer
};
