const mongoose = require("mongoose"); // Erase if already
// const Language = require("./languageModel");

// Declare the Schema of the Mongo model
const variationSchema = new mongoose.Schema({
  weight: { type: String, require: true, default: 0 },
  uid: { type: String, index: true },
  hsn_code: { type: String },
  share_rp: { type: Number, default: 0 },
  sale_rp: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
  images: [
    {
      public_id: { type: String },
      url: { type: String },
    },
  ],
  mainImage_url: {
    public_id: { type: String },
    url: { type: String },
  },
  variantAttr: [{ type: String }],
  attributeList: [
    {
      attributeSetMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attributeSetMaster",
      },
      list: [
        {
          attribute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "attribute",
          },
          value: String,
        },
      ],
    },
  ],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    added_by: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
      index: true
    },
    category_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        require: true,
      },
    ],
    industry_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "prodIndustry",
        require: true,
      },
    ],
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brands",
      default: null,
    },

    barcode: { type: String },

    isGlobalImage: { type: Boolean, default: false },
    isGlobalAttribute: { type: Boolean, default: false },

    images: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],

    mainImage_url: {
      public_id: { type: String },
      url: { type: String },
    },

    show_stock_quantity: { type: Boolean },
    minimum_purchase_qty: { type: Number },
    minimum_order_qty: { type: Number },
    shipping_cost: { type: Number },
    show_stock_with_text_only: { type: Boolean },
    hide_stock: { type: Boolean },
    low_stock_quantity: { type: Number },
    minimum_purchase_qty: { type: Number },    
    cash_on_delivery: { type: Boolean },
    todays_deal: { type: Boolean },
    attributeList: [
      {
        attributeSetMaster: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "attributeSetMaster",
        },
        list: [
          {
            attribute: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "attribute",
            },
            value: String,
          },
        ],
      },
    ],

    variation_Form: [
      {
        title: String,
        name: String,
        data: [{ type: String }],
        id: String,
      },
    ],
    flashDeal: {
      start_Date: { type: Date },
      end_Date: Date,
      discount_type: { type: String },
      discount: { type: Number },
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'transgender']
    },

    

    weights: { type: String },
    unit: { type: String },
    quotation: { type: Boolean, default: false },
    thumbnail_img: { type: String },
    video_provider: { type: String },
    video_link: { type: String },
    tags: [],
    productDescription: { type: String },


/*     variations: {
      type: [variationSchema],
      default: () => {
        return null;
      },
    },
 */    featured: {
      type: Boolean,
      default: false,
    },
    seller_featured: { type: String },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany" },
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages" },
    uid: { type: String },
    color: [],
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    total_quantity: { type: Number, default: 5 },
    totalrating: {
      type: String,
      default: 0,
    },
    approve: { type: Boolean, default: true },
    meta_title: { type: String },
    meta_description: { type: String },
    meta_keywords: { type: String },
    slug: { type: String },
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages", index: true },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true },

    uid: { type: String, index: true },
    trending: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
/*   let language = await Language.findOne({
    accCompany_id: this.accCompany_id,
    _id: this.language_id,
  });
  if (language == null) {
    throw new Error("Either language is wrong or company id is wrong!");
  }
 */  next();
});

productSchema.index({
  tags: "text",
  name: "text",
  //  variations: { sku: "text" },
  trending: -1,
});

//Export the model
module.exports = mongoose.model("Product_test", productSchema);
