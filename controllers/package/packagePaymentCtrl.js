const asyncHandler = require("express-async-handler");
const PackagePayment = require("../models/packagePaymentModel");
const Transaction = require("../models/walletTransactionModel");
const Package = require("../models/packageModel");
const PaymentGate = require("../models/paymentGatewayCredentialModel");

const cloudinary = require("../utils/cloudinary");

const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");

const { SHA256 } = require("crypto-js");

const createPackagePayment = asyncHandler(async (req, res) => {
  try {
    let package = await Package.findById(req.body.packageId).populate(
      "Currency_id"
    );
    if (package == null) {
      throw new Error("Package is not available!");
    }
    if (req.body.paymentMode == "cheque") {
      let image;
      if (req.file != undefined) {
        image = await cloudinary.cloudinaryUploadImg(
          __dirname + "/uploads/" + req.file.filename
        );
      }
      let transaction = await Transaction.create({
        offline_payment: true,
        reciept: req.body.paymentReceipt,
        chequeNo: req.body.chequeNo,
        amount: package.sale_price,
        userid: req.user._id,
        attachment: image,
        currency_id: package.Currency_id,
      });

      let packagePayment = await PackagePayment.create({
        package_id: req.body.packageId,
        transType: "cheque",
        transactionId: transaction._id,
        user_id: req.user._id,
      });

      res.json({ message: "success" });
    } else {
      let transaction = await Transaction.create({
        offline_payment: false,
        amount: package.sale_price,
        userid: req.user._id,
        currency_id: package.Currency_id,
      });

      let packagePayment = await PackagePayment.create({
        package_id: req.body.packageId,
        transType: "paymentGateway",
        transactionId: transaction._id,
        user_id: req.user._id,
      });
      
      var options = {
        amount: package.sale_price * 100, // amount in the smallest currency unit
        currency: package.Currency_id.code,
        receipt: transaction._id,
      };
      let paymentCred = await PaymentGate.findOne();

      let baseSixFour = Buffer.from(JSON.stringify({
      merchantId: paymentCred.merchantId, 
      merchantTransactionId: transaction._id, 
      amount: package.sale_price * 100, 
      merchantUserId: req.user._id, 
      redirectUrl: "https://growmore.app/home", 
      redirectMode: "POST",
      callbackUrl: "https://growmore.app/api/paymentGateway/phonePeCheckout", 
//      callbackUrl: "https://growmore.app/api/paymentGateway/phonePeCheckout",  
      "mobileNumber": req.user.phone,
      "paymentInstrument": {
        "type": "PAY_PAGE"
      } })).toString('base64')
      let sha256 = SHA256(baseSixFour + '/pg/v1/pay' + paymentCred.secret).toString();
      res.json({ checksum: sha256 + "###1", baseSixFour: baseSixFour });
      /*       var instance = new Razorpay({
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
 */    }

    //  console.log(req.body, req.file);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePackagePayment = asyncHandler(async (req, res) => {
  try {
    let packages = await PackagePayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(packages);
  } catch (error) {
    throw new Error(error);
  }
});

const getPackagePaymentList = asyncHandler(async (req, res) => {
  try {
    let packages = await PackagePayment.aggregate([
      {
        $lookup: {
          from: "packages",
          localField: "package_id",
          foreignField: "_id",
          as: "package_id"
        }
      },
      {
        $unwind: "$package_id"
      },
      {
        $unwind: "$package_id.title"
      },
      {
        $match: {
          "package_id.title.language_id": new mongoose.Types.ObjectId(req.user.language_id)
        }
      },
      {
        $lookup: {
          from: "transactionwallets",
          localField: "transactionId",
          foreignField: "_id",
          as: "transactionId"
        }
      },
/*       { $unwind: "$transactionId" }
 */    ]);
/*       .populate({
        path: "package_id transactionId",
        select: [
          "trans_type",
          "title",
          "amount",
          "approval",
          "offline_payment",
          "attachment",
          "status",
        ],
      })
      .sort({ createdAt: -1 });
 */    res.json(packages);
  } catch (error) {
    throw new Error(error);
  }
});

const getPackageById = asyncHandler(async (req, res) => {
  try {
    let packages = await PackagePayment.findById(req.params.id);
    res.json(packages);
  } catch (error) {
    throw new Error(error);
  }
});

const getPackageByIdAdmin = asyncHandler(async (req, res) => {
  try {
    let packages = await PackagePayment.findById(req.params.id).populate({
      path: "user_id transactionId package_id",
      select: ["firstname", "lastname", "name", "title", "amount", "status"],
    });
    res.json(packages);
  } catch (error) {
    throw new Error(error);
  }
});

const packageStatusUpdate = asyncHandler(async (req, res) => {
  try {
    let package = await PackagePayment.findByIdAndUpdate(req.params.id, {
      status: req.body.order_status,
    });
    let trans = await Transaction.findByIdAndUpdate(package.transactionId, {
      status: req.body.trans_status,
    });
    res.json({ message: "Success" });
  } catch (error) {
    throw new Error(error);
  }
});

const deletePackagePayment = asyncHandler(async (req, res) => {
  try {
    let packages = await PackagePayment.findByIdAndDelete(req.params.id);
    res.json(packages);
  } catch (error) {
    throw new Error(error);
  }
});

const packagePaymentListByUser = asyncHandler(async (req, res) => {
  try {
    let packages = await PackagePayment.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $lookup: {
          from: "transactionwallets",
          localField: "transactionId",
          foreignField: "_id",
          as: "transactionId",
        },
      },
      {
        $unwind: "$transactionId",
      },
      {
        $match: {
          "transactionId.approval": true,
        },
      },
      {
        $project: {
          _id: "$transactionId.userid",
          package: "$package_id",
          createdAt: "$createdAt",
        },
      },
      {
        $lookup: {
          from: "packages",
          localField: "package",
          foreignField: "_id",
          as: "package_id",
        },
      },
    ]);
    let found = false;
    let package = null;
    let timeLeft = null;
    if (packages != undefined && packages[0]?.package_id.length >= 0) {
      found = true;
      /*       var date1 = new Date("06/30/2019");

      let time = packages[0].createdAt;
      time.setDate(time.getDate() + packages[0].package_id[0].withdrawAmount);
      package = time;


      var date2 = new Date("07/30/2019");
      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
 */
      var date1 = packages[0].createdAt;
      let time = packages[0].createdAt;
      time.setDate(time.getDate() + packages[0]?.package_id[0]?.withdrawAmount);
      package = time;
      if (new Date().getTime() > time.getTime()) {
        timeleft = false;
      } else {
        timeLeft = true;
      }
    }
    res.json({ found, package, timeLeft });
  } catch (error) {
    throw new Error(error);
  }
});

const packagePaymentListByUserId = asyncHandler(async (req, res) => {
  try {
    let packages = await PackagePayment.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "transactionwallets",
          localField: "transactionId",
          foreignField: "_id",
          as: "transactionId",
        },
      },
      {
        $unwind: "$transactionId",
      },
      {
        $match: {
          "transactionId.approval": true,
        },
      },
      {
        $project: {
          _id: "$transactionId.userid",
          package: "$package_id",
          createdAt: "$createdAt",
        },
      },
      {
        $lookup: {
          from: "packages",
          localField: "package",
          foreignField: "_id",
          as: "package_id",
        },
      },
    ]);
    let found = false;
    let package = null;
    let timeLeft = null;
    if (packages != undefined && packages[0]?.package_id.length >= 0) {
      found = true;
      var date1 = packages[0].createdAt;
      let time = packages[0].createdAt;
      time.setDate(time.getDate() + packages[0]?.package_id[0]?.withdrawAmount);
      package = time;
      if (new Date().getTime() > time.getTime()) {
        timeLeft = false;
      } else {
        timeLeft = true;
      }
    }
    res.json({ found, package, timeLeft });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPackagePayment,
  updatePackagePayment,
  getPackageById,
  getPackagePaymentList,
  deletePackagePayment,
  packagePaymentListByUser,
  getPackageByIdAdmin,
  packageStatusUpdate,
  packagePaymentListByUserId
};
