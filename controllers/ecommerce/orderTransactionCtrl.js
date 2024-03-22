const OrderTransaction = require("../../models/ecommerce/orderTransactionModel");
const Order = require("../../models/ecommerce/pickupPoint_OrderModel");
const asyncHandler = require("express-async-handler");
// const Purchase = require("../../models/ecommerce/purchaseModel");
//const Invoice = require("../models/serviceInvoiceModel");

const createOrderTransaction = asyncHandler(async (req, res) => {
  try {
    let transaction;
    if (req.body.paymentMethod == "credit") {
    } else if (
      req.body.paymentMethod == "cash" ||
      req.body.paymentMethod == "cheque"
    ) {
      transaction = await OrderTransaction.create({
        Amount: req.body.amount,
        referenceNo: req.body.referenceNo,
        orderId: req.body.orderId,
        currency: req.body.currency,
        paymentMethod: req.body.paymentMethod,
        status: "Success",
      });
    } else {
      throw new Error("Please Choose correct payment Method");
    }

    let transactions = await OrderTransaction.find({
      orderId: req.body.orderId,
    });
    let amount = 0;
    if (transactions.length > 0) {
      transactions.forEach((transaction) => {
        if (transaction.status == "Success") {
          amount += transaction.Amount;
        }
      });
    }
    let order = await Order.findById(req.body.orderId);
    order.Paid = amount;
    order.Balance = order.grandTotal - amount;

    if (order.Balance <= 0) {
      await Order.findByIdAndUpdate(req.body.orderId, {
        Payment_Status: "644fba3275eb6d3d4914a611",
        Paid: order.Paid,
        Balance: order.Balance,
      });
    } else if (order.Balance > 0) {
      await Order.findByIdAndUpdate(req.body.orderId, {
        Payment_Status: "644fba2b75eb6d3d4914a60f",
        Paid: order.Paid,
        Balance: order.Balance,
      });
    } else {
    }
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const createPurchaseTransaction = asyncHandler(async (req, res) => {
  try {
    let transaction;
    if (req.body.paymentMethod == "credit") {
    } else if (
      req.body.paymentMethod == "cash" ||
      req.body.paymentMethod == "cheque"
    ) {
      transaction = await OrderTransaction.create({
        Amount: req.body.amount,
        referenceNo: req.body.referenceNo,
        purchaseId: req.body.purchaseId,
        currency: req.body.currency,
        paymentMethod: req.body.paymentMethod,
        status: "Success",
      });
    } else {
      throw new Error("Please Choose correct payment Method");
    }

    let transactions = await OrderTransaction.find({
      purchaseId: req.body.purchaseId,
    });
    let amount = 0;
    if (transactions != null && transactions.length > 0) {
      transactions.forEach((transaction) => {
        if (transaction.status == "Success") {
          amount += transaction.Amount;
        }
      });
    }

    let order = await Purchase.findById(req.body.purchaseId);
    if (order.amount <= amount) {
      order.paymentStatus = "644fba3275eb6d3d4914a611";
    } else if (amount > 0) {
      order.paymentStatus = "644fba2b75eb6d3d4914a60f";
    } else {
    }
    order.Paid = amount;
    order.Balance = order.grandTotal - amount;
    await order.save();
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const createInvoicePurchaseTransaction = asyncHandler(async (req, res) => {
  try {
    let transaction;
    if (req.body.paymentMethod == "credit") {
    } else if (
      req.body.paymentMethod == "cash" ||
      req.body.paymentMethod == "cheque"
    ) {
      transaction = await OrderTransaction.create({
        Amount: req.body.amount,
        referenceNo: req.body.referenceNo,
        invoiceId: req.body.invoiceId,
        currency: req.body.currency,
        paymentMethod: req.body.paymentMethod,
        status: "Success",
      });
    } else {
      throw new Error("Please Choose correct payment Method");
    }

    let transactions = await OrderTransaction.find({
      invoiceId: req.body.invoiceId,
    });
    console.log(transactions);
    let amount = 0;
    if (transactions != null && transactions.length > 0) {
      transactions.forEach((transaction) => {
        if (transaction.status == "Success") {
          amount += transaction.Amount;
        }
      });
    }

    let order = await Invoice.findById(req.body.invoiceId);
    if (order.amount <= amount) {
      order.paymentStatus = "644fba3275eb6d3d4914a611";
    } else if (amount > 0) {
      order.paymentStatus = "644fba2b75eb6d3d4914a60f";
    } else {
    }
    order.Paid = amount;
    order.Balance = order.grandTotal - amount;
    await order.save();
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const orderTransactionList = asyncHandler(async (req, res) => {
  try {
    let transactions = await OrderTransaction.find({
      orderId: req.params.id,
    }).sort({ createdAt: 1 });
    res.json(transactions);
  } catch (error) {
    throw new Error(error);
  }
});

const orderTransactionDelete = asyncHandler(async (req, res) => {
  try {
    let orderTransaction = await OrderTransaction.findByIdAndDelete(
      req.params.id
    );
    let transactions = await OrderTransaction.find({
      orderId: orderTransaction.orderId,
    });
    let amount = 0;
    if (transactions.length > 0) {
      transactions.forEach((transaction) => {
        if (transaction.status == "Success") {
          amount += transaction.Amount;
        }
      });
    }

    let order = await Order.findById(orderTransaction.orderId);
    if (order.amount <= amount) {
      order.Payment_Status = "644fba3275eb6d3d4914a611";
    } else if (amount > 0) {
      order.Payment_Status = "644fba2b75eb6d3d4914a60f";
    } else {
    }
    order.Paid = amount;
    order.Balance = order.grandTotal - amount;
    await order.save();
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const orderTransactionUpdate = asyncHandler(async (req, res) => {
  try {
    const updateTrans = await OrderTransaction.findById(
      req.params.id,
      {
        Amount: req.body.amount,
        paymentMethod: req.body.paymentMethod,
        currency: req.body.currency,
        referenceNo: req.body.referenceNo,
      },
      { new: true }
    );
    let transactions = await OrderTransaction.find({
      orderId: req.body.orderId,
    });

    let amount = 0;
    if (transactions.length > 0) {
      transactions.forEach((transaction) => {
        console.log(transaction);
        if (transaction.status == "Success") {
          amount += transaction.Amount;
        }
      });
    }

    let order = await Order.findById(req.body.orderId);
    if (order.amount <= amount) {
      order.Payment_Status = "644fba3275eb6d3d4914a611";
    } else if (amount > 0) {
      order.Payment_Status = "644fba2b75eb6d3d4914a60f";
    } else {
    }
    order.Paid = amount;
    order.Balance = order.grandTotal - amount;
    await order.save();
    res.json({ updateTrans, order });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderTransactionById = asyncHandler(async (req, res) => {
  try {
    const order = await OrderTransaction.findById(req.params.id);
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrderTransaction,
  orderTransactionDelete,
  orderTransactionList,
  createPurchaseTransaction,
  createInvoicePurchaseTransaction,
  orderTransactionUpdate,
  getOrderTransactionById,
};
