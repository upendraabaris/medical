const PickupPointsStock = require("../models/pickupPoint_stockModel");
const asyncHandler = require("express-async-handler");
const ProductStockQty = require("../models/productStockModel");
const ProductStock = require("../models/pickupPoint_stockModel");

const createPickupPointsStock = asyncHandler(async (req, res) => {
  try {
    const pickupPointStock = await PickupPointsStock.create(req.body);
    res.json(pickupPointStock);
  } catch (error) {
    throw new Error(error);
  }
});

const damageControlStock = asyncHandler(async (req, res) => {
  try {
    const pickupPointStock = await PickupPointsStock.create({
      product_id: req.body.product_id,
      variant_id: req.body.variant_id,
      sku: req.body.sku,
      pickupPoint_id: req.body.pickupPoints,
      trans_type: "damage",
      staff: req.body.staff,
      qty: req.body.qty,
    });
    let productStockQty = await ProductStock.find({
      product_id: req.body.product_id,
      variant_id: req.body.variant_id,
      sku: req.body.sku,
      pickupPoint_id: req.body.pickupPoints,
    });

    let qty = 0;
    if (productStockQty.length > 0) {
      productStockQty.forEach((product) => {
        if (product.qty != undefined) {
          if (product.trans_type == "credit") {
            qty += product.qty;
          } else if (
            product.trans_type == "reserve" ||
            product.trans_type == "damage"
          ) {
            qty -= product.qty;
          }
        }
      });
    }

    let productQty = await ProductStockQty.findOne({
      product_id: req.body.product_id,
      variant: req.body.variant_id,
      pickupPoints: req.body.pickupPoints,
      sku: req.body.sku,
    });
    if (productQty == null) {
      await ProductStockQty.create({
        product_id: req.body.product_id,
        sku: req.body.sku,
        variant: req.body.variant_id,
        qty: qty,
        pickupPoints: req.body.pickupPoints,
      });
    } else {
      productQty.qty = qty;
      await productQty.save();
    }
    res.json(pickupPointStock);
  } catch (error) {
    throw new Error(error);
  }
});

const transferProductStock = asyncHandler(async (req, res) => {
  try {
    if (req.body.products.length > 0) {
      let product = req.body.products;
      product.forEach(async (product) => {
        await PickupPointsStock.create({
          product_id: product.product_id,
          variant_id: product.variant_id,
          sku: product.sku,
          pickupPoint_id: req.body.TopickupPoints,
          trans_type: "credit",
          transfer: {
            type: "credit",
            to: req.body.FrompickupPoints,
          },
          staff: req.body.staff,
          qty: product.qty,
        });

        await PickupPointsStock.create({
          product_id: product.product_id,
          variant_id: product.variant_id,
          sku: product.sku,
          pickupPoint_id: req.body.FrompickupPoints,
          trans_type: "debit",
          transfer: {
            type: "debit",
            to: req.body.TopickupPoints,
          },
          staff: req.body.staff,
          qty: product.qty,
        });

        //To product Quantity
        let productStockQty = await ProductStock.find({
          product_id: product.product_id,
          variant_id: product.variant_id,
          sku: product.sku,
          pickupPoint_id: req.body.TopickupPoints,
        });
        let qty = 0;
        if (productStockQty.length > 0) {
          productStockQty.forEach((product) => {
            if (product.qty != undefined) {
              if (product.trans_type == "credit") {
                qty += product.qty;
              } else if (
                product.trans_type == "reserve" ||
                product.trans_type == "damage" ||
                product.trans_type == "debit"
              ) {
                qty -= product.qty;
              }
            }
          });
        }
        let productQty = await ProductStockQty.findOne({
          product_id: product.product_id,
          variant: product.variant_id,
          pickupPoints: req.body.TopickupPoints,
          sku: product.sku,
        });
        if (productQty == null) {
          await ProductStockQty.create({
            product_id: product.product_id,
            sku: product.sku,
            variant: product.variant_id,
            qty: qty,
            pickupPoints: req.body.TopickupPoints,
          });
        } else {
          productQty.qty = qty;
          await productQty.save();
        }

        //From product Quantity
        productStockQty = await ProductStock.find({
          product_id: product.product_id,
          variant_id: product.variant_id,
          sku: product.sku,
          pickupPoint_id: req.body.FrompickupPoints,
        });

        qty = 0;
        if (productStockQty.length > 0) {
          productStockQty.forEach((product) => {
            if (product.qty != undefined) {
              if (product.trans_type == "credit") {
                qty += product.qty;
              } else if (
                product.trans_type == "reserve" ||
                product.trans_type == "damage" ||
                product.trans_type == "debit"
              ) {
                qty -= product.qty;
              }
            }
          });
        }
        let productQty1 = await ProductStockQty.findOne({
          product_id: product.product_id,
          variant: product.variant_id,
          pickupPoints: req.body.FrompickupPoints,
          sku: product.sku,
        });
        if (productQty1 == null) {
          await ProductStockQty.create({
            product_id: product.product_id,
            sku: product.sku,
            variant: product.variant_id,
            qty: qty,
            pickupPoints: req.body.FrompickupPoints,
          });
        } else {
          productQty1.qty = qty;
          await productQty1.save();
        }
      });
      res.json({ message: "done" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const transferCreditProductStock = asyncHandler(async (req, res) => {
  try {
    const pickupPointStocks = await PickupPointsStock.aggregate([
      {
        $lookup: {
          from: "product_tests",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $unwind: "$product.variations",
      },
      {
        $match: {
          $expr: { $eq: ["$product.variations.sku", "$sku"] },
          transfer: { $ne: null },
          "transfer.type": "credit",
          createdAt: {
            $gte: new Date(req.params.from),
            $lte: new Date(req.params.to),
          },
        },
      },
      {
        $project: {
          _id: {
            product_id: "$_id",
            sku: "$product.variations.sku",
          },
          variant: "$product.variations",
          productName: "$product.name",
          toPickupPoints: "$transfer.to",
          type: "$transfer.type",
          qty: "$qty",
          cost: { $multiply: ["$qty", "$product.variations.purchase_rate"] },
        },
      },
    ]);
    res.json(pickupPointStocks);
  } catch (error) {
    throw new Error(error);
  }
});

const transferDebitProductStock = asyncHandler(async (req, res) => {
  try {
    const pickupPointStocks = await PickupPointsStock.aggregate([
      {
        $lookup: {
          from: "product_tests",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $unwind: "$product.variations",
      },
      {
        $match: {
          $expr: { $eq: ["$product.variations.sku", "$sku"] },
          transfer: { $ne: null },
          "transfer.type": "debit",
          createdAt: {
            $gte: new Date(req.params.from),
            $lte: new Date(req.params.to),
          },
        },
      },
      {
        $project: {
          _id: {
            product_id: "$_id",
            sku: "$product.variations.sku",
          },
          variant: "$product.variations",
          productName: "$product.name",
          toPickupPoints: "$transfer.to",
          type: "$transfer.type",
          qty: "$qty",
          cost: { $multiply: ["$qty", "$product.variations.purchase_rate"] },
        },
      },
    ]);
    res.json(pickupPointStocks);
  } catch (error) {
    throw new Error(error);
  }
});

const damageProductStockReport = asyncHandler(async (req, res) => {
  try {
    const pickupPointStocks = await PickupPointsStock.aggregate([
      {
        $lookup: {
          from: "product_tests",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $unwind: "$product.variations",
      },
      {
        $match: {
          $expr: { $eq: ["$product.variations.sku", "$sku"] },
          trans_type: "damage",
          createdAt: {
            $gte: new Date(req.params.from),
            $lte: new Date(req.params.to),
          },
        },
      },
      {
        $project: {
          _id: {
            product_id: "$_id",
            sku: "$product.variations.sku",
          },
          variant: "$product.variations",
          productName: "$product.name",
          toPickupPoints: "$transfer.to",
          type: "$transfer.type",
          qty: "$qty",
          damageNo: "$damageNo",
          cost: { $multiply: ["$qty", "$product.variations.purchase_rate"] },
        },
      },
    ]);
    res.json(pickupPointStocks);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePickupPointsStock = asyncHandler(async (req, res) => {
  try {
    const pickupPointStock = await PickupPointsStock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(pickupPointStock);
  } catch (error) {
    throw new Error(error);
  }
});

const deletePickupPointsStock = asyncHandler(async (req, res) => {
  try {
    const pickupPointsStock = await PickupPointsStock.findByIdAndDelete(
      req.params.id
    );
    res.json(pickupPointsStock);
  } catch (error) {
    throw new Error(error);
  }
});

const getPickupPointsStock = asyncHandler(async (req, res) => {
  try {
    const pickupPointsStock = await PickupPointsStock.find();
    res.json(pickupPointsStock);
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdPickupPointsStock = asyncHandler(async (req, res) => {
  try {
    const pickupPointsStock = await PickupPointsStocks.findById(req.params.id);
    res.json(pickupPointsStock);
  } catch (error) {
    throw new Error(error);
  }
});

const getPickupPointsBySellerId = asyncHandler(async (req, res) => {
  try {
    const pickupPointsStock = await PickupPointsStock.find({
      seller_id: req.params.id,
    });
    res.json(pickupPointsStock);
  } catch (error) {
    throw new Error(error);
  }
});

const getPickupPointsByStaffId = asyncHandler(async (req, res) => {
  try {
    const pickupPointsStock = await PickupPointsStock.find({
      staff: req.params.id,
    });
    res.json(pickupPointsStock);
  } catch (error) {
    throw new Error(error);
  }
});

const productWiseFiltering = asyncHandler(async (req, res) => {
  try {
    const pickupPointsStock = await PickupPointsStock.find({
      product_id: req.body.product,
      variant_id: req.body.variant,
      sku: req.body.sku,
      pickupPoint_id: req.body.pickupPoint,
    });
    res.json(pickupPointsStock);
  } catch (error) {
    throw new Error(error);
  }
});

const productWisePickupPointsList = asyncHandler(async (req, res) => {
  try {
    const pickupPointsStock = await PickupPointsStock.find({
      product_id: req.body.product,
      variant_id: req.body.variant,
      sku: req.body.sku,
    }).populate("pickupPoint_id");
    console.log(pickupPointsStock.length);
    pickupPoints = [];
    pickupPointsStock.forEach((stock) => {
      if (stock.trans_type == "added") {
        let found = false;
        pickupPoints.forEach((pick) => {
          if (
            String(stock.pickupPoint_id._id) == String(pick.pickupPoint_id._id)
          ) {
            pick.qty += stock.qty;
            found = true;
          }
        });
        if (!found) {
          let pick = {
            pickupPoint_id: stock.pickupPoint_id,
            qty: stock.qty,
          };
          pickupPoints.push(pick);
        }
      }
    });
    res.json(pickupPoints);
  } catch (error) {
    throw new Error(error);
  }
});

const productReport = asyncHandler(async (req, res) => {
  try {
    const Report = await PickupPointsStock.aggregate([
      {
        $lookup: {
          from: "product_tests",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $match: {
          "product.0": { $exists: true },
        },
      },
      {
        $lookup: {
          from: "pickup_points",
          localField: "pickupPoints",
          foreignField: "_id",
          as: "pickupPoints",
        },
      },
      {
        $group: {
          _id: {
            product_id: "$product_id",
            variant: "$variant_id",
          },
          purchase: {
            $sum: {
              $cond: ["$trans_type", "credit", 1],
            },
          },
        },
      },
    ]);
    res.json(Report);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPickupPointsStock,
  updatePickupPointsStock,
  deletePickupPointsStock,
  getPickupPointsStock,
  getByIdPickupPointsStock,
  getPickupPointsBySellerId,
  getPickupPointsByStaffId,
  productWiseFiltering,
  productWisePickupPointsList,
  productReport,
  damageControlStock,
  transferProductStock,
  transferCreditProductStock,
  transferDebitProductStock,
  damageProductStockReport,
};
