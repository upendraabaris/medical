const mongoose = require("mongoose");
const PickupPoint_mrnSchema = require("../../models/ecommerce/pickupPoint_MrnModel");
// const DamageSequenceNo = require("./damageControlSNoMasterModel");

const pickupPoint_stockSchema = new mongoose.Schema(
  {
    product_id: { type: String},
    variant_id: { type: String },
    sku: { type: String },
    pickupPoint_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pickup_point",
    },
    trans_type: {
      type: String,
      enum: ["credit", "reserve", "debit", "damage"],
    },
    transfer: {
      type: { type: String, enum: ["credit", "debit"] },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pickup_point",
      },
    },
    mrnNo: { type: String },
    bulkReferId: { type: String },
    damageNo: { type: String },
    transNo: { type: String },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "staff" },
    qty: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true }
  },
  {
    timestamps: true,
  }
);

pickupPoint_stockSchema.pre("save", async function (next) {
  if (this.trans_type == "damage") {
    /*     const seq = await DamageSequenceNo.findByIdAndUpdate(
      "646b4d86a62dcec27c73f10e",
      { $inc: { sequence: 1 } }
    );
    this.damageNo = "D-" + seq.sequence;
 */
  } else {
    const pickupPoint_Mrn = await PickupPoint_mrnSchema.findByIdAndUpdate(
      { _id: "643975e071619c5b344d7bab" },
      { $inc: { sequence: 1 } }
    );
    this.mrnNo = "ETG-MRN-" + pickupPoint_Mrn.sequence;
  }
  next();
});

module.exports = mongoose.model("pickupPoint_stock", pickupPoint_stockSchema);
