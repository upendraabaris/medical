const asyncHandler = require("express-async-handler");
// var PaytmChecksum = require("paytmchecksum");
// const config = require("../config/config");
// const https = require("https");
const Transaction = require("../models/walletTransactionModel");
const Razorpay = require("razorpay");
const axios = require("axios");
// const User = require("../models/userModel");

const transactionInitialize = async (req, res) =>{
  try{
    let transaction = await Transaction.create({
      amount: req.body.amount,
      currency: "INR",
      trans_type: "Payment",
      user_id: req.user,
      note: "Transaction Initialize",
    });
    var options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: transaction.order_id,
      payment_capture: true
    };
    var instance = new Razorpay({
      key_id: process.env.RAZOR_KEY,
      key_secret: process.env.RAZOR_SECRET,
    });

    instance.orders.create(options, async function (err, order) {
      if (err != null) {
        res.status(err.statusCode).json(err);
      } else {
        let trans = await Transaction.findByIdAndUpdate(
          transaction._id,
          {
            reciept: order.id,
          }
        );
        res.json(order);
      }
    });
  }catch(error){
    throw new Error(error);
  }
}


const createPaymentCheckSum = asyncHandler(async (req, res) => {
  try {
    if (req.body.amount < 1) {
      throw new Error("Amount must be greater then 1");
    } else {
      let transaction = await Transaction.create({
        amount: req.body.amount,
        currency: "INR",
        trans_type: "Added",
        userid: req.user._id,
      });

      var options = {
        amount: req.body.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: transaction.order_id,
      };
      var instance = new Razorpay({
        key_id: process.env.RAZOR_KEY,
        key_secret: process.env.RAZOR_SECRET,
      });

      instance.orders.create(options, async function (err, order) {
        if (err != null) {
          res.status(err.statusCode).json(err);
        } else {
          await Transaction.findByIdAndUpdate(transaction._id, {
            reciept: order.id,
          });
          res.json(order);
        }
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const test = asyncHandler(async (req, res) => {
  try {
    res.json("success");
  } catch (error) {}
});

const checkout = asyncHandler(async (req, res) => {
  try {
    //    let payments;
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(body.toString())
      .digest("hex");
    var response = { signatureIsValid: "false" };
    if (expectedSignature === req.body.razorpay_signature) {
      response = { signatureIsValid: "true" };
      let trans = await Transaction.findOne({
        reciept: req.body.razorpay_order_id,
      });
      trans.approval = true;
      razorpay_payment_id = req.body.razorpay_payment_id;
      razorpay_order_id = req.body.razorpay_order_id;
      razorpay_signature = req.body.razorpay_signature;

      await trans.save();
/*       let wallet = await User.findById(trans.userid);
      wallet.wallet_Payment += trans.amount;
      wallet.save();
 */    }
    res.redirect("http://localhost:8100");

  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPaymentCheckSum,
  test,
  checkout,
  transactionInitialize
};
