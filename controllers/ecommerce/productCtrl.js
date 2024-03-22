const Product = require("../../models/ecommerce/productModel");
const asyncHandler = require("express-async-handler");
// const slugify = require("slugify");
// const Search = require("../models/searchModel");
const mongoose = require("mongoose");
const ProductCostVariation = require("../../models/ecommerce/productCostVariationModel");
const Seller = require("../../models/ecommerce/sellersModel");
// const Recent = require("../models/recentModel");

// const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../../models/user/userModel");
const Category = require("../../models/ecommerce/prodcategoryModel");
const Brand = require("../../models/ecommerce/brandModel");
// const ComboDeals = require("../models/comboDealModel");
// const Settings = require("../models/settingApproveStatusModel");
// const Wholesale = require("../models/wholesaleModel");
// const GeneralSetting = require("../models/generalSettingsModel");

// const Sequence = require("../models/SequenceUidMaster/productSequnceModel");
const Sequence = require("../../models/ecommerce/SequenceUidMaster/productSequnceModel");
const Currency = require("../../models/currencyModel");
const Country = require("../../models/countryModel");
// const CategoryType = require("../models/categoryMaster/categoryTypeModel");

const Industry = require("../../models/ecommerce/prodIndustryModel");

const Client = require("../../middleware/redis");
// const Variations = require("../models/variationsModel");
//const ProductDiamond = require("../models/productDiamonModel");

__dirname = path.resolve(path.dirname(__filename), "../");

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
});

//const graphql = require("express-grpah");
// const validateMongoDbId = require("../utils/validateMongodbId");

function reCursion(attributes, count, str) {
  let count1 = count + 1;
  let retu = [];
  attributes[count].data.forEach((data) => {
    if (count1 < attributes.length) {
      let data1 = str + "-" + data;
      if (str == "") {
        data1 = data;
      }
      let getData = reCursion(attributes, count1, data1);
      if (retu.length == 0) {
        retu = getData;
      } else {
        getData.forEach((vari) => {
          retu.push(vari);
        });
      }
      return retu;
    } else {
      let str1 = str + "-" + data;
      if (str == undefined) {
        str1 = data;
      }
      retu.push(str1);
    }
  });
  return retu;
}

function chkDuplicates(arr, justCheck) {
  var len = arr.length,
    tmp = {},
    arrtmp = arr.slice(),
    dupes = [];
  arrtmp.sort();
  while (len--) {
    var val = arrtmp[len];
    if (/nul|nan|infini/i.test(String(val))) {
      val = String(val);
    }
    if (tmp[JSON.stringify(val)]) {
      if (justCheck) {
        return true;
      }
      dupes.push(val);
    }
    tmp[JSON.stringify(val)] = true;
  }
  return justCheck ? false : dupes.length ? dupes : null;
}

function randomValue(uidList) {
  let uiD = "ui-" + Math.floor(Math.random() * 100);
  let found = false;
  uidList.forEach((uid) => {
    if(uid == uiD) {
      found = true;
    }
  });
  if(found) {
    return randomValue(uidList);
  }
  else {
    return uiD;
  }
}

const addProductVariationForm = asyncHandler(async (req, res) => {
  try {
    let variations = [];
    if (
      req.body.colors != undefined &&
      req.body.colors.length > 0 &&
      req.body.attributes != undefined &&
      req.body.attributes.length > 0
    ) {
    } else if (
      req.body.colors == undefined &&
      req.body.attributes != undefined &&
      req.body.attributes.length > 0
    ) {
      let attributes = req.body.attributes;
      let count = 0;
      let variation;
      if (req.body.attributes.length > 1) {
        req.body.attributes.forEach((data) => {
          /*           if (chkDuplicates(data.data, true)) {
            throw new Error("Form Variation enter data is not Valid");
          }
 */
        });
        variation = reCursion(attributes, count, "");
      } else {
        variation = attributes[0].data;
      }

      let variations = [];
      let saved_Variation = req.body.variations;
      if (saved_Variation == undefined) {
        saved_Variation = [];
      }
      let uidList = [];
      saved_Variation.forEach((variant) => {
        uidList.push(variant.uid);
      });
      if (variation.length > 0) {
        variation.forEach((vary, i) => {
          let uid = randomValue(uidList);
          let found;
          if (saved_Variation != undefined) {
            found = saved_Variation.find((id) => {
              return String(id.weight) == String(vary);
            });
          }
          if (found != undefined && found != null) {
            found.variantAttr = vary.replace("-", ",").split(",");
            found.isDelete = false;
            variations.push(found);
          } else {
            variations.push({
              _id: new mongoose.Types.ObjectId(),
              variantAttr: vary.replace("-", ",").split(","),
              weight: vary,
              isActive: true,
              uid: uid,
              isDelete: false
            });
          }
        });
      }
      saved_Variation.forEach((variant) => {
        let found = false;
        variations.forEach((vary) => {
          if(vary.weight == variant.weight) {
            found = true;
          }
        });
        if(!found) {
          variant.isDelete = true;
          variations.push(variant);
        }
      });
      res.json(variations);
    } else {
      res.json([]);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const variationPriceUpdate = asyncHandler(async (req, res) => {
  try {
    if (req.body.variations == undefined) {
      throw new Error("Must have variations field");
    } else {
      req.body.variations.forEach((vary) => {
        if (vary.discount_type == "Percent") {
          let disc = (vary.mrp * vary.discount) / 100;
          vary.sale_rate = vary.mrp - disc;
        } else {
          vary.sale_rate = vary.mrp - vary.discount;
        }
      });
      res.json(req.body.variations);
    }
  } catch (error) {
    throw new Error(error);
  }
});

__dirname = path.resolve(path.dirname(__filename), "../");
// const Language = require("../models/languageModel");

const createProduct = asyncHandler(async (req, res) => {
  try {
    let found = await Sequence.findOne({ accCompany_id: req.companyId });
    if (found == null) {
      found = await Sequence.create({
        accCompany_id: req.companyId,
        sequence: 0,
      });
    }
    const seq = await Sequence.findByIdAndUpdate(found._id, {
      $inc: { sequence: 1 },
    });

    let variations = [];
    let test = [];

    const language = await Language.findOne({
      accCompany_id: req.companyId,
      name: "English",
    });

    let slug;
    req.body.list.forEach((categ) => {
      if (
        String(categ.language_id) == String(language._id) ||
        String(categ.language_id?._id) == String(language._id)
      ) {
        slug = slugify(categ.slug);
      }
    });

    if (slug == undefined) {
      throw new Error("Please enter slug");
    }

    let foundSlug = await Product.findOne({
      slug: slug,
      accCompany_id: req.companyId,
    });

    let seller_id;
    if(req.type == "Staff") {
      seller_id = req.body.list[0].product.seller_id;
    }
    else {
      seller_id = req.user.seller_id;
    }
    
    if (foundSlug != null) {
      throw new Error("Slug already exist!");
    }

    let allVariant = [];
    let prices = [];
    req.body.list?.forEach((product, index) => {
      product.slug = slug;
      product.uid = seq?.sequence;
      product.accCompany_id = req.companyId;
      let prod = new Product(product);
      test.push(prod);      
      
      product.variations.forEach((variant, variantIndex) => {

        variant.product_id = prod._id
        let variantS = [];
        let vary = new Variations(variant);
        variantS.push(vary);
        variant.prices.forEach((price) => {
          prices.push(new ProductCostVariation({
            ...price,
            variant_id: vary._id,
            product_id: prod._id,
            accCompany_id: req.companyId,
            seller_id: seller_id,
          })
        )

        });
        variantS.forEach((vari) => {
          allVariant.push(vari);
        })
      })
    });


    let vary = []
    allVariant.forEach((vari) => {
      vary.push(vari.save());
    });

    let products = [];
    test.forEach((te) => {
      products.push(te.save());
    })

    let price = [];
    prices.forEach((pric) => {
      price.push(pric.save());
    })

    let [ productList, variantList, priceList ] = await Promise.all([products, vary, prices ])
    res.json({ productList, variantList, priceList })

/*     let products = [];
    test.forEach((product) => {
      products.push(product.save());
    });
    let variants = [];
    variations.forEach((variant) => {
      variants.push(variant.save());
    });

    Promise.all(products, variations)
      .then(async (result) => {
        const allKeys = await Client.keys(`*product:${req.companyId}:*`);
        if (allKeys.length > 0) {
          await Client.del(allKeys);
        }
        res.json({ test, variations });
      })
      .catch((error) => {
        throw new Error(error);
      });
 */    //    res.json({ test, variations });
  } catch (error) {
    throw new Error(error);
  }
});

const createProductDiamond = asyncHandler(async (req, res) => {
  try {
    let found = await Sequence.findOne({ accCompany_id: req.companyId });
    if (found == null) {
      found = await Sequence.create({
        accCompany_id: req.companyId,
        sequence: 0,
      });
    }
    const seq = await Sequence.findByIdAndUpdate(found._id, {
      $inc: { sequence: 1 },
    });

    let variations = [];
    let test = [];
    req.body.list?.forEach((product, index) => {
      product.uid = seq?.sequence;
      product.accCompany_id = req.companyId;
      test.push(new ProductDiamond(product));
      if (product?.isPriceFixed) {
        product.prices.forEach((price) => {
          price._id = undefined;
          variations.push(
            new ProductCostVariation({
              ...price,
              product_id: test[index]._id,
              accCompany_id: req.companyId,
              seller_id: product.seller_id,
            })
          );
        });
      }
    });

    let products = [];
    test.forEach((product) => {
      products.push(product.save());
    });
    let variants = [];
    variations.forEach((variant) => {
      variants.push(variant.save());
    });

    const [ product, variant ] = await Promise.all(products, variations).catch((error) => {
      throw new Error(error);
    })
    res.json({ product, variant });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    if(req.type != "Staff" && req.type != "Seller") {
      throw new Error("You are not Authorize");
    }
    let products = [];
    let searchProduct = [];
    req.body.list.forEach((categ) => {
      if (categ._id != undefined) {
        products.push(Product.findById(categ._id));
      } else {
        searchProduct.push(
          Product.findOne({
            uid: req.params.id,
            accCompany_id: req.companyId,
            language_id: categ.language_id,
          })
        );
      }
    });

    const language = await Language.findOne({
      accCompany_id: req.companyId,
      name: "English",
    });

    let slug;
    req.body.list.forEach((categ) => {
      if (
        String(categ.language_id._id) == String(language._id) ||
        String(categ.language_id) == String(language._id)
      ) {
        slug = slugify(categ.slug);
      }
    });

    if (slug == undefined) {
      throw new Error("Please enter slug");
    }

    let found = await Product.findOne({
      slug: slug,
      uid: { $ne: req.params.id },
      accCompany_id: req.companyId,
    });

    if (found != null) {
      throw new Error("Slug already exist!");
    }

    let [result, searchProduct1] = await Promise.all([products, searchProduct]);
        let foundAuth = true;
        //   let productNotFound = false;
        result.forEach((item) => {
          if (item == null) {
            productNotFound = true;
          }
          if (String(item.accCompany_id) != String(req.companyId)) {
            foundAuth = false;
          }
        });

        if (!foundAuth) {
          throw new Error("You are not authorize");
        } else {
          let products = [];
          let variants = [];
          req.body.list.forEach((product) => {
            products.push(product.findOneAndUpdate({uid: req.params.id, language_id: product.language_id?._id}, product, { new: true }))            
            product.variations.forEach((variant) => {
              variants.push(variant.findById(variant._id));              
            });
          });
          let [productList, variantSearch] = await Promise.all([products, variantSearch]);

          let notFound = false;
          variantSearch.forEach((variant) => {
            if(variant == null) {
              notFound = true;
            }
          });

          let variantCreate = []
          let prices = []
          if(notFound) {
            req.body.list.forEach((product) => {
              product.variations.forEach((variant) => {
                let found = false;
                variantSearch.forEach((varySea) => {
                  if (
                    varySea?.weight == variant.weight &&
                    String(variant.product_id) == String(product._id)
                  ) {
                    found = true;
                    variant.prices.forEach((price) => {
                      prices.push(ProductCostVariation.findByIdAndUpdate(price));
                    })
                  }
                });
                if(!found) {
                  let vary = new Variations({ ...variant, product_id: product._id});
                  variantCreate.push(vary.save());
                  variant.prices?.forEach((variantprice) => {
                    let price = new ProductCostVariation({ ...variantprice, product_id: product._id, variant_id: vary._id });
                    prices.push(price.save());
                  });
                }
              });
            });
          }
        }
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductDiamond = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let products = [];
    req.body.list.forEach((categ) => {
      products.push(ProductDiamond.findById(categ._id));
    });

    Promise.all(products).then((result) => {
      let found = true;
      result.forEach((item) => {
        if (
          item == null ||
          String(item.accCompany_id) != String(req.companyId)
        ) {
          found = false;
        }
      });
      if (!found) {
        throw new Error("You are not authorize");
      } else {
        let updateProduct = [];
        let variations = [];
        variantFind = [];
        variantSearch = [];
        req.body.list.forEach((item) => {
          updateProduct.push(
            ProductDiamond.findByIdAndUpdate(item._id, item, { new: true })
          );
        });
        Promise.all(updateProduct).then((result) => {
          res.json({ message: "success" });
        });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let products = await Product.find({
      accCompany_id: req.companyId,
      uid: id,
    });
    let deleteProducts = [];
    products.forEach((product) => {
      deleteProducts.push(Product.findByIdAndDelete(product._id));
    });
    Promise.all(deleteProducts).then(async (result) => {
      const allKeys = await Client.keys(`*product:${req.companyId}:*`);
      if (allKeys.length > 0) {
        await Client.del(allKeys);
      }
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // validateMongoDbId(id);
  try {
    /*     let seller = await Seller.find({ approve: true }).select("_id");
    let sellerIds = seller?.map(({ _id }) => _id);
 */
    /*     let getaProduct = await Product.aggregate([
      {
        $match: {
          uid: id,
          language_id: new mongoose.Types.ObjectId(req.user.language_id),
          accCompany_id: new mongoose.Types.ObjectId(req.companyId)
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "c"
        }
      }
    ]);
 */
    //`Wish:User:${req.user._id}`

    let getProduct = await Client.get(
      `getProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:${id}`
    );
    let wishGet = null;
    if (req.user?._id != undefined) {
      wishGet = await Client.get(`Wish:User:${req.user._id}`);
      wishGet = JSON.parse(wishGet);
      if (wishGet == null) {
        const user = await User.findById(req.user._id);
        wishGet = user.wishlist;
      }
    }

    if (getProduct == null) {
      let getaProduct = await Product.findOne({
        uid: id,
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
      })
        .populate("category_id brand_id")
        .populate({
          path: "variations.attributeList",
          populate: "attributeSetMaster list.attribute",
        })
        .populate({ path: "attributeList.attributeSetMaster", select: "name" })
        .populate({ path: "attributeList.list.attribute", select: "name" })
        .lean();

      if (getaProduct == null) {
        return res.json({
          message: "Page not found!",
          user: req.user,
        });
      }

      getaProduct.wish = false;

      let costVariations = [];
      getaProduct.variations = getaProduct.variations.filter((variant) => {
        if (variant.isActive) {
          costVariations.push(
            ProductCostVariation.find({
              product_id: getaProduct._id,
              variant_id: variant._id,
              country_id: req.user.country_id,
            })
              .populate({ path: "country_id", populate: "currency_id" })
              .populate({
                path: "seller_id",
                select: ["firstname", "lastname"],
              })
          );
          return variant;
        }
      });

      /*     let cart = [];
  
      if (req.cookies.products != undefined) {
        cart = req.cookies.products;
        cart.forEach((product) => {
          if (String(product.productId) == String(getaProduct._id)) {
            getaProduct.variations.forEach((variant) => {
              if (String(variant._id) == String(product.variantId)) {
                variant.cart = true;
              }
            });
          }
        });
      }
   */
      const country = await Country.findById(req.user.country_id).populate(
        "currency_id"
      );

      Promise.all(costVariations).then(async (result) => {
        getaProduct.variations.forEach((variant) => {
          result.forEach((cost) => {
            if (
              String(cost[0]?.product_id) == String(getaProduct._id) &&
              String(cost[0]?.variant_id) == String(variant._id)
            ) {
              variant.prices = cost;
            }
          });
          if (variant.prices == undefined) {
            variant.prices = [
              { mrp: 200, sale_rate: 150, country_id: country },
            ];
          }
        });

        await Client.set(
          `getProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:${id}`,
          JSON.stringify(getaProduct)
        );
        if (wishGet != undefined && wishGet.length > 0) {
          wishGet?.forEach((wishProd) => {
            if (wishProd == req.params.id) {
              getaProduct.wish = true;
            }
          });
        }

        res.json({ product: getaProduct });
      });
    } else {
      getProduct = JSON.parse(getProduct);
      if (wishGet != undefined && wishGet.length > 0) {
        wishGet?.forEach((wishProd) => {
          if (wishProd == req.params.id) {
            getProduct.wish = true;
          }
        });
      }
      res.json({ product: getProduct });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getProductPrice = asyncHandler(async (req, res) => {
  try {
    let productId = new mongoose.Types.ObjectId(req.params.id);
    let variant = req.params.variant;
    let sku = req.params.sku;
    let qty = Number(req.params.qty);
    let sale_rate;

    let wholeSale = await Wholesale.aggregate([
      {
        $match: {
          productId: productId,
          seller_id: new mongoose.Types.ObjectId(req.params.seller),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $match: {
          "products.product_id": productId,
          "products.variant_id": variant,
          "products.sku": sku,
        },
      },
      {
        $unwind: "$products.wholesale",
      },
      {
        $match: {
          "products.wholesale.min_qty": { $lte: qty },
          "products.wholesale.max_qty": { $gte: qty },
        },
      },
    ]);
    if (wholeSale.length > 0) {
      sale_rate = wholeSale[0].products.wholesale.sale_price * qty;
    } else {
      sale_rate = null;
    }

    res.json({
      sale_rate,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getProductAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // validateMongoDbId(id);
  try {
    if(req.type != "Seller" && req.type != "Staff") {
      throw new Error("you are not authorize");
    }

    let getaProduct = await Product.aggregate([
      {
        $match: {
          uid: id,
          accCompany_id: new mongoose.Types.ObjectId(req.companyId)
        }
      },
      {
        $lookup: {
          from: "product_variants",
          localField: "_id",
          foreignField: "product_id",
          as: "variations"
        }
      },
      {
        $lookup: {
          from: "languages",
          localField: "language_id",
          foreignField: "_id",
          as: "language_id"
        }
      },
      {
        $unwind: {
          path: "$attributeList",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "attributesetmasters",
          localField: "attributeList.attributeSetMaster",
          foreignField: "_id",
          as: "attributeLists.attributeSetMaster"
        }
      },
      {
        $lookup: {
          from: "product_variants",
          localField: "_id",
          foreignField: "product_id",
          as: "variations"
        }
      },
      {
        $unwind: {
          path: "$variations",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "productcostvariations",
          let: { variant: {$toString: "$variations._id"}, product: "$_id", seller_id: "$seller_id" },
          pipeline: [
            {
              $match: {
              $expr: {
                $and: [
                  { $eq: ["$$variant", "$variant_id"] },
                  { $eq: ["$$product", "$product_id"] },
                  { $eq: ["$$seller_id", "$seller_id"] }
                ]
              }
            }
          }
          ],
          as: "variations.prices"
        }
      },
      {
        $unwind: {
          path: "$category_id",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category_id"
        }
      },
      {
        $group: {
          _id: "$_id",
          language_id: {$first: {name: {$first: "$language_id.name"}, _id: {$first: "$language_id._id"}} },
          variations: {$addToSet: "$variations"},
          category_id: {$addToSet: {$first: "$category_id"} },
          brand_id:  {$first: "$brand_id"} ,
          seller_id: {$first:"$seller_id" },
          createdAt: {$first:"$createdAt" },
          images: {$first:"$images" },
          mainImage_url: {$first:"$mainImage_url" },
          isGlobalImage: {$first:"$isGlobalImage" },
          isGlobalAttribute: {$first:"$isGlobalAttribute" },
          "show_stock_quantity": {$first: "$show_stock_quantity"},
          "minimum_purchase_qty": {$first: "$minimum_purchase_qty" },
          "minimum_order_qty": {$first: "$minimum_order_qty" },
          "shipping_cost": {$first: "$shipping_cost" },
          "show_stock_with_text_only": { $first: "$show_stock_with_text_only" },
          "hide_stock": {$first: "$hide_stock" },
          "low_stock_quantity": {$first : "$low_stock_quantity" },
          "cash_on_delivery": {$first: "$cash_on_delivery" },
          "todays_deal": {$first: "$todays_deal" },
          "attributeList": {$addToSet: "$attributeList" },
          "variation_Form": {$first: "$variation_Form" },
          "weights": { $first: "$weights" },
          "unit": { $first: "$unit" },
          "quotation": { $first: "$quotation" },
          "video_link": { $first: "$video_link" },
          "tags": { $first: "$tags" },
          "productDescription": { $first: "$productDescription" },
          approve: {$first: "$approve"},
          barcode: {$first: "$barcode"},
          color: {$first: "$color"},
          featured: {$first: "$featured"},
          industry_id: {$first: "$industry_id"},
          "meta_description": {$first: "$meta_description"},
          "meta_keywords": {$first: "$meta_keywords"},
          "meta_title": {$first: "$meta_title"},
          "name": {$first: "$meta_name"},
          "ratings": { $first: "$ratings" },
          "slug": { $first: "$slug" } ,
          "total_quantity": { $first: "$total_quantity" },
          "totalrating": { $first: "$totalrating" },
          "trending": { $first: "$trending" },
          "uid": { $first: "$uid" },
          "updatedAt": { $first: "$updatedAt"  } ,
          accCompany_id: { $first: "$accCompany_id" },
          name: {$first: "$name"}
        }
      }
    ]);
    res.json({ product: getaProduct });
    /*     let getaProduct = await Product.find({
      uid: id,
      accCompany_id: req.companyId,
    })
      .populate({
        path: "attributeList.attributeSetMaster attributeList.list.attribute",
        select: "name",
      })
      .populate({ path: "language_id", select: "name" })
      .populate({ path: "category_id", select: "name" })
      .populate({
        path: "variations.attributeList",
        populate: "attributeSetMaster list.attribute",
      })
      .lean();

    if (getaProduct?.length == 0) {
      return res.json({ message: "Page not found!" });
    }

    let costVariations = [];

    getaProduct.forEach((products) => {
      products.variations = products.variations.filter((variant) => {
        if (variant.isActive) {
          costVariations.push(
            ProductCostVariation.find({
              product_id: products._id,
              variant_id: variant._id,
            }).populate({ path: "country_id" })
          );
          return variant;
        }
      });
    });

    Promise.all(costVariations).then(async (result) => {
      getaProduct.forEach((products) => {
        products.variations.forEach((variant) => {
          variant.price = [];
          result.forEach((cost) => {
            if (
              String(cost[0]?.product_id) == String(products._id) &&
              String(cost[0]?.variant_id) == String(variant._id)
            ) {
              variant.prices = cost;
            }
          });
        });
      });

      res.json({ product: getaProduct });
    }); */

    /*       let seller;
      if (getaProduct.seller_id == null) {
        seller = await Seller.findById("64269f0df127906d53878d3d");
      } else {
        seller = await Seller.findById(getaProduct.seller_id);
      }

 */
    /* if (getaProduct?.variation_Form.length == 0) {
      getaProduct.variation_Form = [
        {
          title: "Size",
          data: [],
        },
      ];

      getaProduct?.variations?.forEach((variant) => {
        if (variant.isActive) {
          getaProduct?.variation_Form[0]?.data.push(variant.weight);
        }
      });
    }
 */
    //    res.json(getaProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaFeaturedProduct = asyncHandler(async (req, res) => {
  try {
    let generalSetting = await GeneralSetting.findOne({
      parent_id: "64882bf65ec65f7ca4cf04bf",
      accCompany_id: req.companyId,
    });

    if (generalSetting?.featured == "true") {
      const products = await Client.get(
        `getaFeaturedProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}`
      );
      if (products == null) {
        const getFeaturedProduct = await Product.find({
          accCompany_id: req.companyId,
          language_id: req.user.language_id,
          featured: true,
          approve: true,
        })
          .populate({ path: "category_id brand_id", select: "name" })
          .select("name category_id brand_id variations uid slug createdAt")
          .sort({ createdAt: -1 })
          .lean();
        let getVariations = [];
        getFeaturedProduct?.forEach((getaProduct) => {
          getaProduct.variations = getaProduct.variations.filter((variant) => {
            if (variant.isActive) {
              getVariations.push(
                ProductCostVariation.findOne({
                  product_id: getaProduct._id,
                  variant_id: variant._id,
                  country_id: req.user.country_id,
                  //                seller_id: getaProduct.seller_id,
                  ///country_id: "6512b8f4fbd47a425641bbc4",
                  //                isActive: true,
                }).populate({ path: "country_id", populate: "currency_id" })
              );
              return variant;
            }
          });
        });
        const country = await Country.findById(req.user.country_id).populate(
          "currency_id"
        );
        Promise.all(getVariations).then(async (result) => {
          getFeaturedProduct?.forEach((getProduct) => {
            getProduct?.variations?.forEach((variant) => {
              result?.forEach((cost) => {
                if (
                  String(cost?.product_id) == String(getProduct._id) &&
                  String(cost?.variant_id) == String(variant._id)
                ) {
                  variant.prices = cost;
                }
              });
              if (variant.prices == undefined) {
                variant.prices = {
                  mrp: 200,
                  sale_rate: 150,
                  country_id: country,
                };
              }
            });
          });
          await Client.set(
            `getaFeaturedProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}`,
            JSON.stringify(getFeaturedProduct)
          );
          res.json(getFeaturedProduct);
        });
      } else {
        res.json([]);
      }
    } else {
      res.json(JSON.parse(products));
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getallProduct = await Product.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    })
      .sort({ created_at: -1 })
      .populate("category_id")
      .populate("brand_id")
      .select("name category_id brand_id variations uid slug createdAt")
      .lean();
    const getVariations = [];
    getallProduct?.forEach((getaProduct) => {
      getaProduct.variations = getaProduct.variations.filter((variant) => {
        if (variant.isActive) {
          getVariations.push(
            ProductCostVariation.findOne({
              isActive: true,
              product_id: getaProduct._id,
              variant_id: variant._id,
              //              seller_id: getaProduct.seller_id,
              country_id: req.user.country_id,
            }).populate({ path: "country_id", populate: "currency_id" })
          );
          return variant;
        }
      });
    });
    Promise.all(getVariations).then((result) => {
      getallProduct?.forEach((getProduct) => {
        getProduct?.variations?.forEach((variant) => {
          result.forEach((cost) => {
            if (
              String(cost?.product_id) == String(getProduct._id) &&
              String(cost?.variant_id) == String(variant._id)
            ) {
              variant.prices = cost;
            }
          });
        });
      });
      res.json(getallProduct);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProductPagination = asyncHandler(async (req, res) => {
  try {
    const products = await Client.get(
      `getAllProductPagination:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:${req.params.id}:${req.params.count}`
    );
    if (products == null) {
      let category = await Category.find({
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
        approve: false,
      }).select("_id");
      let categoryIds = category?.map(({ _id }) => _id);

      let brand = await Brand.find({
        accCompany_id: req.companyId,
        approve: false,
      }).select("_id");
      let brandIds = brand?.map(({ _id }) => _id);

      let seller = await Seller.find({
        accCompany_id: req.companyId,
        approve: false,
      }).select("_id");
      let sellerIds = seller?.map(({ _id }) => _id);

//      console.log(category, seller, brand);
      const getallProduct = await Product.find({
        approve: true,
        language_id: req.user.language_id,
        accCompany_id: req.companyId,
        seller_id: { $nin: sellerIds },
        brand_id: { $nin: brandIds },
      })
        .sort({ created_at: -1 })
        .skip(req.params.id * req.params.count)
        .limit(req.params.count)
        .populate("category_id")
        .populate("brand_id")
        .select("name category_id brand_id variations uid slug createdAt isGlobalAttribute isGlobalImage mainImage_url images")
        .lean();
      let variations = [];
      getallProduct?.forEach((getaProduct) => {
        getaProduct.variations = getaProduct?.variations?.filter((variant) => {
          if (variant.isActive) {
            variations.push(
              ProductCostVariation.findOne({
                isActive: true,
                product_id: getaProduct._id,
                variant_id: variant._id,
                country_id: req.user.country_id,
                //              accCompany_id: req.companyId,
              }).populate({
                path: "country_id",
                select: "currency_id",
                populate: { path: "currency_id", select: "symbol" },
              })
            );
            return variant;
          }
        });
      });
      const country = await Country.findById(req.user.country_id).populate(
        "currency_id"
      );
      Promise.all(variations).then(async (result) => {
        getallProduct.forEach((getProduct) => {
          getProduct?.variations?.forEach((variant) => {
            result.forEach((cost) => {
              if (
                String(cost?.product_id) == String(getProduct._id) &&
                String(cost?.variant_id) == String(variant._id)
              ) {
                variant.prices = cost;
              }
            });
            if (variant.prices == undefined) {
              variant.prices = {
                mrp: 200,
                sale_rate: 150,
                country_id: country,
              };
            }
          });
        });
        await Client.set(
          `getAllProductPagination:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:${req.params.id}:${req.params.count}`,
          JSON.stringify(getallProduct)
        );
        await Client.expire(
          `getAllProductPagination:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:${req.params.id}:${req.params.count}`,
          3600
        );
        res.json(getallProduct);
      });
    } else {
      res.json(JSON.parse(products));
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProductAdmin = asyncHandler(async (req, res) => {
  try {
    var filter = { accCompany_id: new mongoose.Types.ObjectId(req.companyId) };
    if(req.type == "Seller") {
//      filter = { seller_id: new mongoose.Types.ObjectId(req.user._id) }
    }
    else if(req.type == "Staff") {
    }
    else {
      throw new Error("Sorry you are not authorize");
    }

    const getallProduct = await Product.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "product_variants",
          localField: "_id",
          foreignField: "product_id",
          as: "variations"
        }
      },
      {
        $group: {
          _id: {
            uid: "$uid",
          },
          product: {
            $push: {
              _id: "$_id",
              approve: "$approve",
              name: "$name",
              variations: "$variations",
              language_id: "$language_id",
              category_id: "$category_id",
              brand_id: "$brand_id",
              seller_id: "$seller_id",
              createdAt: "$createdAt",
              images: "$images",
              mainImage_url: "$mainImage_url",
              isGlobalImage: "$isGlobalImage",
              isGlobalAttribute: "$isGlobalAttribute"
            },
          },
        },
      },
      {
        $project: {
          _id: "$_id",
          product: "$product",
          productDisplay: {
            $filter: {
              input: "$product",
              cond: {
                $and: [
                  {
                    $eq: [
                      "$$this.language_id",
                      new mongoose.Types.ObjectId(req.user.language_id),
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: "$_id",
          languages: { $size: "$product" },
          product: {
            $cond: [
              { $eq: [{ $size: "$productDisplay" }, 1] },
              { $first: "$productDisplay" },
              { $first: "$product" },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "product.brand_id",
          foreignField: "_id",
          as: "product.brand_id",
        },
      },
      {
        $lookup: {
          from: "sellers",
          localField: "product.seller_id",
          foreignField: "_id",
          as: "product.seller_id",
        },
      },
      {
        $unwind: {
          path: "$product.category_id",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "product.category_id",
          foreignField: "_id",
          as: "category_id",
        },
      },
      {
        $group: {
          _id: "$_id",
          languages: { $first: "$languages" },
          product: { $first: "$product" },
          categories: { $push: { $first: "$category_id" } },
        },
      },
      {
        $sort: {
          "product.createdAt": -1,
        },
      },
      {
        $skip: Number(req.query.page) * Number(req.query.count)
      },
      {
        $limit: Number(req.query.count)
      }
    ]);

    /* let prodList = []
    getallProduct.forEach((prod) => {
      
    })
 */
    /*     const getallProduct = await Product.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    })
      .sort({ created_at: -1 })
      .populate("category_id")
      .populate("brand_id")
      .populate({ path: "seller_id", select: ["firstname", "lastname"] });
 */ res.json(getallProduct);
  } catch (error) {
    throw new Error(error);
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const searchProduct = asyncHandler(async (req, res) => {
  try {
    let searchProductItem = await Client.get(
      `searchProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:${req.params.search}`
    );
    if (searchProductItem == null) {0
      //    const search = req.params.search;
      let category = await Category.find({
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
        approve: true,
      }).select("_id");
      let categoryIds = category?.map(({ _id }) => _id);

      let brand = await Brand.find({
        accCompany_id: req.companyId,
        approve: true,
      }).select("_id");

      let brandIds = brand?.map(({ _id }) => _id);

      let seller = await Seller.find({
        accCompany_id: req.companyId,
        approve: true,
      }).select("_id");
      let sellerIds = seller?.map(({ _id }) => _id);

      const updateSearch = await Search.findOne({
        query: req.params.search,
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
      });

      if (updateSearch == null) {
        Search.create({
          query: req.params.search,
          count: 1,
          accCompany_id: req.companyId,
          language_id: req.user.language_id,
        });
      } else {
        await Search.findByIdAndUpdate(
          updateSearch._id,
          { $inc: { count: 1 } },
          { new: true }
        );
      }

      let search = new RegExp(escapeRegex(req.params.search), "gi");

      const getSearchedProduct = await Product.find({
        $or: [
          /*         {
          $text: {
            $search: search,
            $diacriticSensitive: true,
          },
        },
 */       {
            name: { $regex: search },
          },
        ],
        approve: true,
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
      }).lean(); /* .sort({ score: { $meta: "textScore" } }) */

      getVariationProduct = await Product.find({
        accCompany_id: req.companyId,

        "variations.sku": new RegExp("^" + req.params.search + "$", "i"),
        approve: true,
      });

      const priceList = [];
      getSearchedProduct.forEach((getaProduct) => {
        getaProduct.variations = getaProduct.variations.filter((variant) => {
          if (variant.isActive) {
            priceList.push(
              ProductCostVariation.findOne({
                country_id: req.user.country_id,
                product_id: getaProduct._id,
                variant_id: variant._id,
              }).populate({
                path: "country_id",
                select: "currency_id",
                populate: { path: "currency_id", select: "name symbol" },
              })
            );
            return variant;
          }
        });
      });

      Promise.all(priceList).then(async (prices) => {
        getSearchedProduct.forEach((prod) => {
          prod.variations.forEach((variant) => {
            prices.forEach((price) => {
              if (
                String(prod._id) == String(price?.product_id) &&
                String(variant._id) == String(price?.variant_id)
              ) {
                variant.prices = price;
              }
            });
          });
        });

        await Client.set(
          `searchProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:${req.params.search}`,
          JSON.stringify({ getSearchedProduct, getVariationProduct })
        );
        await Client.expire(
          `searchProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:${req.params.search}`,
          3600
        );

        res.json({ getSearchedProduct, getVariationProduct });
      });
    } else {
      searchProductItem = JSON.parse(searchProductItem);
      res.json(searchProductItem);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const trendingSearches = asyncHandler(async (req, res) => {
  try {
    const trending = await Client.get(
      `TrendingSearchProduct:${req.companyId}:${req.user.language_id}`
    );
    if (trending == null) {
      const trendingSearches = await Search.find({
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
      })
        .sort({ createdAt: -1 })
        .limit(10);

      await Client.set(
        `TrendingSearchProduct:${req.companyId}:${req.user.language_id}`,
        JSON.stringify(trendingSearches)
      );
      await Client.expire(
        `TrendingSearchProduct:${req.companyId}:${req.user.language_id}`,
        36000
      );
      res.json(trendingSearches);
    } else {
      res.json(JSON.parse(trending));
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getFilterProduct = asyncHandler(async (req, res) => {
  try {
    let filterCache = await Client.get(
      `getFilterProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:categ:${req.body.categories}:brand:${req.body.brands}:sort:${req.body.sort}:minPrice:${req.body.minPrice}:maxPrice:${req.body.maxPrice}:search:${req.body.search}:industry:${req.body.industries}`
    );
    let search;
    if(req.body.search != undefined && req.body.search != "") {
        const updateSearch = await Search.findOne({
          query: req.params.search,
          accCompany_id: req.companyId,
          language_id: req.user.language_id,
        });
    
        if (updateSearch == null) {
          Search.create({
            query: req.params.search,
            count: 1,
            accCompany_id: req.companyId,
            language_id: req.user.language_id,
          });
        } else {
          await Search.findByIdAndUpdate(
            updateSearch._id,
            { $inc: { count: 1 } },
            { new: true }
          );
        }
    
        search = new RegExp(escapeRegex(req.body.search), "gi");    
      }
    if (filterCache == null) {

      let [category, industry, brand, seller] = await Promise.all([Category.find({
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
        approve: false,
      }).select("_id"), Industry.find({
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
        approve: false,
      }).select("_id"), Brand.find({
        accCompany_id: req.companyId,
        approve: false,
      }).select("_id"), Seller.find({
        accCompany_id: req.companyId,
        approve: false,
      }).select("_id")]);
      
      let categoryIds = category?.map(({ _id }) => _id);
      let industryIds = industry?.map(({ _id }) => _id);
      let brandIds = brand?.map(({ _id }) => _id);

      let sellerIds = seller?.map(({ _id }) => _id);

      let filters = {};

      let filter;
      let cs = req.body.sort;
      if (cs == 1) {
        filter = { createdAt: -1 };
      } else if (cs == 2) {
        filter = { createdAt: 1 };
      } else if (cs == 3) {
        filter = { name: -1 };
      } else if (cs == 4) {
        filter = { name: 1 };
      } else if (cs == 5) {
        filter = { "prices.sale_rate": -1 };
      } else if (cs == 6) {
        filter = { "prices.sale_rate": 1 };
      } else if (cs == 7) {
        filter = { featured: 1 };
      } else {
        //      filter = { createdAt: -1 };
      }



      const [categor, brander, industryer] = await Promise.all([Category.find({ accCompany_id: req.companyId, uid: {$in: req.body.categories} }),
      Brand.find({ accCompany_id: req.companyId, uid: {$in: req.body.brands} }),
      Industry.find({ accCompany_id: req.companyId, uid: {$in: req.body.industries} })]);

      let categ = [];
      categor?.forEach((cat) => {
          categ.push(new mongoose.Types.ObjectId(cat));
      });
      if (categ.length > 0) {
        filters = { category_id: { $in: categ } };
      }

      let brands = [];
      brander?.forEach((cat) => {
          brands.push(new mongoose.Types.ObjectId(cat));
      });



      if(brands.length > 0) {
        filters = { brand_id: { $in: brands } };
      }

      if(search != undefined) {
        filters = { name: { $regex: search } };
      }

      let indus = [];
      industryer?.forEach((cat) => {
          indus.push(new mongoose.Types.ObjectId(cat));
        });
      if (indus?.length > 0) {
        filters = { industry_id: { $in: indus } };
      }

    filters = {
      seller_id: { $nin: sellerIds },
      ...filters,
      accCompany_id: new mongoose.Types.ObjectId(req.companyId),
      language_id: new mongoose.Types.ObjectId(
        req.user.language_id
      ),
      approve: true,
    }

      const getFilterProd = await Product.aggregate([
        {
          $match: filters,
        },
        {
          $unwind: "$variations",
        },
        {
          $addFields: {
            variant_id: { $toString: "$variations._id" },
          },
        },
        {
          $lookup: {
            from: "productcostvariations",
            let: {
              product_id: "$_id",
              variant_id: "$variant_id",
              seller_id: "$seller_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$$product_id", "$product_id"] },
                      { $eq: ["$$variant_id", "$variant_id"] },
                      {
                        $eq: [
                          "$country_id",
                          new mongoose.Types.ObjectId(
                            req.user.country_id
                          ),
                        ],
                      },
                      //    { $eq: ["$$seller_id", "$seller_id"] }
                    ],
                  },
                },
              },
            ],
            as: "priceList",
          },
        },
        {
          $lookup: {
            from: "productcostvariations",
            let: {
              product_id: "$_id",
              variant_id: "$variant_id",
              seller_id: "$seller_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$$product_id", "$product_id"] },
                      { $eq: ["$$variant_id", "$variant_id"] },
                      {
                        $eq: [
                          "$country_id",
                          new mongoose.Types.ObjectId(
                            req.user.country_id
                          ),
                        ],
                      },
                      //    { $eq: ["$$seller_id", "$seller_id"] }
                    ],
                  },
                },
              },
            ],
            as: "variations.prices",
          },
        },        
        {
          $unwind: {
            path: "$variations.prices",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "countrymasters",
            localField: "variations.prices.country_id",
            foreignField: "_id",
            as: "variations.prices.country_id",
          }
        },
        {
          $unwind: {
            path: "$variations.prices.country_id",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "currencies",
            localField: "variations.prices.country_id.currency_id",
            foreignField: "_id",
            as: "variations.prices.country_id.currency_id"
          }
        },
        {
          $unwind: {
            path: "$variations.prices.country_id.currency_id",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "countrymasters",
            localField: "priceList.country_id",
            foreignField: "_id",
            as: "country",
          },
        },{
          $group: {
            _id: "$_id",
            uid: { $first: "$uid" },
            slug: { $first: "$slug" },
            name: { $first: "$name" },
            description: { $first: "$description" },
            variations: { $addToSet: "$variations" },
            prices: { $first: { $first: "$priceList" } },
            country: { $first: { $first: "$country" } },
            variation_Form: { $first: "$variation_Form" },
            mainImage_url: {$first:  "$mainImage_url"},
            isGlobalImage: {$first: "$isGlobalImage"},
            isGlobalAttribute: {$first:"$isGlobalAttribute"},
            images: { $first: "$images" }
          },
        },
        {
          $sort: filter,
        },
      ]);


            await Client.set(
              `getFilterProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:categ:${req.body.categories}:brand:${req.body.brands}:sort:${req.body.sort}:minPrice:${req.body.minPrice}:maxPrice:${req.body.maxPrice}:search:${req.body.search}:industry:${req.body.industries}`,
              JSON.stringify(getFilterProd)
            );
            await Client.expire(
              `getFilterProduct:product:${req.companyId}:${req.user.language_id}:${req.user.country_id}:categ:${req.body.categories}:brand:${req.body.brands}:sort:${req.body.sort}:minPrice:${req.body.minPrice}:maxPrice:${req.body.maxPrice}:search:${req.body.search}:industry:${req.body.industries}`,
              3600
            );
            res.json(getFilterProd);
    }
    else {
      res.json(JSON.parse(filterCache));
    }
  } catch (error) {
    throw new Error(error);
  }
});




const getFilterProductByCat = asyncHandler(async (req, res) => {
  try {
    let category = await Category.find({
      accCompany_id: req.companyId,
      approve: false,
    }).select("_id");
    let categoryIds = category?.map(({ _id }) => _id);

    let brand = await Brand.find({
      accCompany_id: req.companyId,
      approve: false,
    }).select("_id");
    let brandIds = brand?.map(({ _id }) => _id);

    let seller = await Seller.find({
      accCompany_id: req.companyId,
      approve: false,
    }).select("_id");
    let sellerIds = seller?.map(({ _id }) => _id);

    let categList = await Category.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
      language_id: req.user.language_id,
    }).select("_id");

    let origCat = [];

    categList?.forEach((categ) => {
      origCat.push(categ._id);
    });

    let categoryList = await Category.find({
      accCompany_id: req.companyId,
      approve: true,
      parent_id: { $in: origCat },
    }).select("_id");

    categoryList.forEach((categ) => {
      origCat.push(categ._id);
    });

    const getProd = await Product.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
      $and: [
        {
          category_id: { $in: origCat },
          approve: true,
        },
        {
          category_id: { $nin: categoryIds },
          brand_id: { $nin: brandIds },
          seller_id: { $nin: sellerIds },
        },
      ],
    }).lean();
    let prices = [];
    getProd.forEach((getaProduct) => {
      getaProduct.variations = getaProduct.variations.filter((variant) => {
        if (variant.isActive) {
          prices.push(
            ProductCostVariation.findOne({
              product_id: getaProduct._id,
              variant_id: variant._id,
              country_id: req.user.country_id,
            }).populate({ path: "country_id", populate: "currency_id" })
          );
          return variant;
        }
      });
    });

    Promise.all(prices).then((result) => {
      getProd.forEach((product) => {
        product.variations.forEach((variant) => {
          result.forEach((price) => {
            if (
              String(product?._id) == String(price?.product_id) &&
              String(variant._id) == String(price.variant_id)
            ) {
              variant.prices = price;
            }
          });
        });
      });
      res.json(getProd);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getFilterProductByBrand = asyncHandler(async (req, res) => {
  try {
    let category = await Category.find({
      accCompany_id: req.companyId,
      approve: true,
    }).select("_id");
    let categoryIds = category?.map(({ _id }) => _id);

    let brand = await Brand.find({
      accCompany_id: req.companyId,
      approve: true,
    }).select("_id");
    let brandIds = brand?.map(({ _id }) => _id);

    let seller = await Seller.find({
      accCompany_id: req.companyId,
      approve: true,
    }).select("_id");
    let sellerIds = seller?.map(({ _id }) => _id);

    const getProd = await Product.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
      $and: [
        {
          brand_id: req.params.id,
          approve: true,
        },
        {
          category_id: { $nin: categoryIds },
          brand_id: { $nin: brandIds },
          seller_id: { $nin: sellerIds },
        },
      ],
    });
    res.json(getProd);
  } catch (error) {
    throw new Error(error);
  }
});

const getSellerProductList = asyncHandler(async (req, res) => {
  try {
    let products = await ProductCostVariation.find({
      accCompany_id: req.companyId,
      seller_id: req.params.id,
      language_id: req.user.language_id,
      approve: true,
    })
      .populate("seller_id")
      .populate("product_id");
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllSellerProductList = asyncHandler(async (req, res) => {
  try {
    let products = await ProductCostVariation.find({
      accCompany_id: req.companyId,
      approve: true,
      language_id: req.user.language_id,
    })
      .populate("seller_id")
      .populate("product_id");
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductFeature = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await Product.findByIdAndUpdate(
      id,
      { featured: req.body.featured },
      { new: true }
    );
    res.json(feature);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSellerProductFeature = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await Product.findByIdAndUpdate(
      id,
      { featured: req.body.featured },
      { new: true }
    );
    res.json(feature);
  } catch (error) {
    throw new Error(error);
  }
});

const flashDealsList = asyncHandler(async (req, res) => {
  try {
    let category = await Category.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
      approve: true,
    }).select("_id");
    let categoryIds = category?.map(({ _id }) => _id);

    let brand = await Brand.find({
      accCompany_id: req.companyId,
      approve: true,
    }).select("_id");
    let brandIds = brand?.map(({ _id }) => _id);

    let seller = await Seller.find({
      accCompany_id: req.companyId,
      approve: true,
    }).select("_id");
    let sellerIds = seller?.map(({ _id }) => _id);

    const flashDeals = await Product.find({
      accCompany_id: req.companyId,

      "flashDeal.start_Date": { $lt: new Date() },
      "flashDeal.end_Date": { $gt: new Date() },
      approve: true,
      category_id: { $nin: categoryIds },
      brand_id: { $nin: brandIds },
      seller_id: { $nin: sellerIds },
    });
    res.json(flashDeals);
  } catch (error) {
    throw new Error(error);
  }
});

const productCount = asyncHandler(async (req, res) => {
  try {
    let count = await Product.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
      approve: true,
    }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const updateActiveStatus = asyncHandler(async (req, res) => {
  try {
    let products = await Product.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let updateProd = [];
    products?.forEach((product) => {
      updateProd.push(
        Product.findByIdAndUpdate(
          product._id,
          {
            approve: req.body.approve,
          },
          { new: true }
        )
      );
    });
    Promise.all(updateProd).then(async (result) => {
      const allKeys = await Client.keys(`*product:${req.companyId}:*`);
      if (allKeys.length > 0) {
        await Client.del(allKeys);
      }
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const sortProducts = asyncHandler(async (req, res) => {
  try {
    if (req.params.id == null) {
      throw new Error("Please choose correct option");
    } else {
      let filter;
      let cs = req.params.id;
      if (cs == 1) {
        filter = { createdAt: 1 };
      } else if (cs == 2) {
        filter = { createdAt: -1 };
      } else if (cs == 3) {
        filter = { name: 1 };
      } else if (cs == 4) {
        filter = { name: -1 };
      } else if (cs == 5) {
        filter = { "variations.sale_rate": 1 };
      } else if (cs == 6) {
        filter = { "variations.sale_rate": -1 };
      } else if (cs == 7) {
        filter = { featured: -1 };
      } else {
        throw new Error("This filter doesn't exist");
      }

      let products = await Product.find({
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
        approve: true,
      }).sort(filter);
      res.json(products);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const sortProductsByCategory = asyncHandler(async (req, res) => {
  try {
    if (req.params.id == null) {
      throw new Error("Please choose correct option");
    } else {
      let filter;
      let cs = req.params.id;
      if (cs == 1) {
        filter = { createdAt: 1 };
      } else if (cs == 2) {
        filter = { createdAt: -1 };
      } else if (cs == 3) {
        filter = { name: 1 };
      } else if (cs == 4) {
        filter = { name: -1 };
      } else if (cs == 5) {
        filter = { "variations.sale_rate": 1 };
      } else if (cs == 6) {
        filter = { "variations.sale_rate": -1 };
      } else if (cs == 7) {
        filter = { featured: -1 };
      } else {
        throw new Error("This filter doesn't exist");
      }

      let products = await Product.find({
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
        category_id: req.params.categ,
        approve: true,
      }).sort(filter);
      res.json(products);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const productUnderPrice = asyncHandler(async (req, res) => {
  try {
    const productList = await ProductCostVariation.aggregate([
      {
        $match: {
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
          country_id: new mongoose.Types.ObjectId(req.user.country_id),
          sale_rate: { $ne: "" },
        },
      },
      {
        $project: {
          _id: "$product_id",
          product_id: "$product_id",
          variant_id: "$variant_id",
          seller_id: "$seller_id",
          sku: "$sku",
          country_id: "$country_id",
          sale_rate: { $toInt: "$sale_rate" },
          mrp: "$mrp",
        },
      },
      {
        $match: {
          sale_rate: { $lte: 199 },
        },
      },
      {
        $lookup: {
          from: "product_tests",
          let: { product_id: "$product_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$_id", "$$product_id"],
                      $eq: [
                        "$language_id",
                        new mongoose.Types.ObjectId(req.user.language_id),
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "product_id",
        },
      },
      {
        $unwind: "$product_id",
      },
    ]);
    const country = await Country.findById(req.user.country_id).populate({
      path: "currency_id",
    });
    res.json({ productList, country });
  } catch (error) {
    throw new Error(error);
  }
});

const jewelProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductDiamond.aggregate([
      {
        $match: {
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
          language_id: new mongoose.Types.ObjectId(req.user.language_id)
        }
      },
      {
        $unwind: {
          path: "$labourChargeType",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "labourchargetypes",
          let: { uid: "$labourChargeType", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "labourChargeType"
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "categories",
          let: { uid: "$category", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "category"
        }
      },
      {
        $unwind: {
          path: "$metals",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "pricetypemasters",
          localField: "metals.priceType",
          foreignField: "_id",
          as: "metals.priceType"
        }
      },
      {
        $lookup: {
          from: "metaltypemasters",
          localField: "metals.metalType",
          foreignField: "_id",
          as: "metals.metalType"
        }
      },
      {
        $group: {
          _id: "$_id",
          category: { $addToSet: {$first: "$category"} },
          labourChargeType: { $addToSet: { $first: "$labourChargeType" } },
          metals: { $addToSet: { priceType: { $first: "$metals.priceType" },  metalType: { $first: "$metals.metalType" } } },
          name: { $first: "$name" },
          sku: { $first: "$sku" },
          hsnCode: { $first: "$hsnCode" },
          uid: { $first: "$uid" },
          mainImage_url: { $first: "$mainImage_url" }
        }
      }  
    ])
      res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const jewelProductGetById = asyncHandler(async (req, res) => {
  try {
    const product = await ProductDiamond.aggregate([
      {
        $match: {
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
          uid: req.params.id,  
        }
      },
      {
        $unwind: {
          path: "$Collection",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "collections",
          let: { uid: "$Collection", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "Collection"
        }
      },
      {
        $unwind: {
          path: "$style",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "styles",
          let: { uid: "$style", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "style"
        }
      },
      {
        $unwind: {
          path: "$labourChargeType",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "labourchargetypes",
          let: { uid: "$labourChargeType", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "labourChargeType"
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "categories",
          let: { uid: "$category", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "category"
        }
      },
      {
        $unwind: {
          path: "$occassions",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "occasions",
          let: { uid: "$occassions", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "occassions"
        }
      },
      {
        $unwind: {
          path: "$ringSize",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "ringsizes",
          let: { uid: "$ringSize", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "ringSize"
        }
      },

      {
        $unwind: {
          path: "$wearTag",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "weartagmasters",
          let: { uid: "$wearTag", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "wearTag"
        }
      },
      {
        $unwind: {
          path: "$lookTag",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "looktagmasters",
          let: { uid: "$lookTag", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "lookTag"
        }
      },
      {
        $unwind: {
          path: "$productTag",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "looktagmasters",
          let: { uid: "$productTag", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "lookTag"
        }
      },
      {
        $unwind: {
          path: "$material",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "materials",
          let: { uid: "$material", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "material"
        }
      },
      {
        $unwind: {
          path: "$gemStone",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "gemstones",
          let: { uid: "$gemStone", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "gemStone"
        }
      },
      {
        $unwind: {
          path: "$theme",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "themes",
          let: { uid: "$theme", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "theme"
        }
      },
      {
        $lookup: {
          from: "productcostvariations",
          localField: "_id",
          foreignField: "product_id",
          as: "prices"
        }
      },
      {
        $group: {
          _id: "$_id",
          Collection: { $addToSet: { $first: "$Collection" } },
          style: { $addToSet: { $first: "$style" } },
          labourChargeType: { $addToSet: { $first: "$labourChargeType" } },
          category: { $addToSet: { $first: "$category" } },
          occassions: { $addToSet:  {$first: "$occassions"}  },
          ringSize: { $addToSet:  {$first: "$ringSize"}  },
          metals: { $first: "$metals" },
          pairProducts: { $first: "$pairProducts" },
          setProducts: { $first: "$setProducts" },                   
          gallary_image: { $first: "$gallary_image" },
          mainImage_url:  { $first: "$mainImage_url" },
          name: { $first: "$name" },
          sku: { $first: "$sku" },
          hsn_code: {$first: "$hsn_code"},
          slug: { $first: "$slug" },
          approve: { $first: "$approve" },
          grossWeight: { $first: "$grossWeight" },
          wearTag: { $addToSet: { $first: "$wearTag" } },
          lookTag: { $addToSet: { $first: "$lookTag" } },
          isCertified: { $first: "$isCertified" },
          isHalmark: {$first: "$isHalmark"},
          isCustomizable: {$first: "$isCustomizable"},
          isStamping: {$first: "$isStamping"},
          carat: {$first: "$carat"},
          point: {$first: "$point"},
          height: { $first: "$height" },
          width: {$first: "$width"},
          length: { $first: "$length" },
          quality: { $first: "$quality" },
          language_id: { $first: "$language_id" },
          uid: { $first: "$uid" },
          stones: { $first: "$stones" },
          diamonds: {$first: "$diamonds"},
          shortDes: { $first: "$shortDes" },
          longDes: { $first: "$longDes" },
          minOrderQty: { $first: "$minOrderQty" },
          maxOrderQty: {$first: "$maxOrderQty"},
          isAvailable: {$first: "$isAvailable"},
          isPriceFixed: { $first: "$isPriceFixed" },
          prices: { $addToSet: { $first: "$prices" } },
          seller_id: { $first: "$seller_id" },
          type: { $first: "$type" },
          material: { $addToSet: {$first: "$material"} },
          gemStone: { $addToSet: { $first: "$gemStone" } },
          theme: { $addToSet: { $first: "$theme" } },
          meta_title: { $first: "$meta_title" },
          meta_description: { $first: "$meta_description" },
          meta_keyword: { $first: "$meta_description" },
          isActive: {$first: "$isActive"}
        }
      }
  ])
/*       .populate(
        "Collection style labourChargeType category metals.priceType metals.metalType pairProducts setProducts occassions ringSize shopForModule defSize productTag wearTag lookTag"
      )
      .lean();
    let categType = [];
    product.forEach((prod) => {
      prod?.categoryType?.forEach((categ) => {
        categType.push(
          CategoryType.findOne({
            uid: categ,
            accCompany_id: req.companyId,
            language_id: req.user.language_id,
          })
        );
      });
    });
    Promise.all(categType).then((result) => {
      result.forEach((res) => {
        product.forEach((prod) => {
          prod.categoryType.forEach((categ, i) => {
            if (categ == res?.uid) {
              categ = res;
              prod.categoryType[i] = res;
            }
          });
        });
      });
 */      res.json(product);
//    });
  } catch (error) {
    throw new Error(error);
  }
});

const productDiamonFilter = asyncHandler(async (req, res) => {
  try {
    let skip = req.body.page * req.body.count;
    let filter = {
      accCompany_id: new mongoose.Types.ObjectId(req.companyId),
      language_id: new mongoose.Types.ObjectId(req.user.language_id)
    };
    
    if(req.body.occassions != undefined && req.body.occassions.length > 0) {
      filter = { occassions: { $in: req.body.occassions } }
    }

    if(req.body.ringSize != undefined && req.body.ringSize.length > 0) {
      filter = { ringSize: { $in: req.body.ringSize } }
    }
    
    if(req.body.shopForModule != undefined && req.body.shopForModule.length > 0) {
      filter = { shopForModule: { $in: req.body.shopForModule } }
    }
    
    if(req.body.category != undefined && req.body.category.length > 0) {
      filter = { category: { $in: req.body.category } }
    }
    
    if(req.body.style != undefined && req.body.style.length > 0) {
      filter = { style: { $in: req.body.style } }
    }
    
    if(req.body.material != undefined && req.body.material.length > 0) {
      filter = { material: { $in: req.body.material } }
    }
    
    if(req.body.gemStone != undefined && req.body.gemStone.length > 0) {
      filter = { gemStone: { $in: req.body.gemStone } }
    }

    if(req.body.theme != undefined && req.body.theme.length > 0) {
      filter = { theme: { $in: req.body.theme } }
    }
    
    if(req.body.length != undefined && req.body.length.length > 0) {
      filter = { length: { $in: req.body.length } }
    }

    if(req.body.sku != undefined && req.body.sku != "") {
      filter = { sku: req.body.sku }
    }

    if(req.body.name != undefined) {
      filter = { name: { $in: req.body.name } }
    }
    
    const products = await ProductDiamond.aggregate([
      {
        $match: filter
      },
      {
        $skip: skip
      },
      {
        $limit: req.body.count
      },
      {
        $project: {
          _id: "$_id",
          uid: "$uid",
          slug: "$slug",
          name: "$name",         
          mainImage_url: "$mainImage_url",
          gallery_image: "$gallary_image" 
        }
      }
    ]);
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const isProductNameExist = asyncHandler(async (req, res) => {
  try {
    const product = await ProductDiamond.findOne({
      accCompany_id: req.companyId,
      name: { $regex: new RegExp("^" + req.params.name.toLowerCase(), "i") },
    });
    if (product == null) {
      res.json({ isExist: false });
    } else {
      res.json({ isExist: true });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const isProductSlugExist = asyncHandler(async (req, res) => {
  try {
    const product = await ProductDiamond.findOne({
      accCompany_id: req.companyId,
      slug: { $regex: new RegExp("^" + req.params.name.toLowerCase(), "i") },
    });
    if (product == null) {
      res.json({ isExist: false });
    } else {
      res.json({ isExist: true });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const isProductSKUExist = asyncHandler(async (req, res) => {
  try {
    const product = await ProductDiamond.findOne({
      accCompany_id: req.companyId,
      sku: { $regex: new RegExp("^" + req.params.name.toLowerCase(), "i") },
    });
    if (product == null) {
      res.json({ isExist: false });
    } else {
      res.json({ isExist: true });
    }
  } catch (error) {
    throw new Error(error);
  }
});


const diamondProductDelete = asyncHandler(async (req, res) => {
  try {
    const products = await ProductDiamond.find({ accCompany_id: req.companyId, uid: req.params.id });
    const productsDelete = await ProductDiamond.deleteMany({ accCompany_id: req.companyId, uid: req.params.id });
    let productIds = [];
    products?.forEach((product) => {
      productIds.push(new mongoose.Types.ObjectId(product._id))
    });
    let variant = await ProductCostVariation.deleteMany({ product_id: { $in: productIds } });
    res.json({ products, variant });
  }
  catch(error) {
    throw new Error(error);
  }
})


const jewelProductFilterAdmin = asyncHandler(async (req, res) => {
  try {
    let filter = {
      accCompany_id: new mongoose.Types.ObjectId(req.companyId),
      language_id: new mongoose.Types.ObjectId(req.user.language_id)
    };
    
    if(req.body.occassions != undefined && req.body.occassions.length > 0) {
      filter = { occassions: { $in: req.body.occassions } }
    }

    if(req.body.ringSize != undefined && req.body.ringSize.length > 0) {
      filter = { ringSize: { $in: req.body.ringSize } }
    }
    
    if(req.body.shopForModule != undefined && req.body.shopForModule.length > 0) {
      filter = { shopForModule: { $in: req.body.shopForModule } }
    }
    
    if(req.body.category != undefined && req.body.category.length > 0) {
      filter = { category: { $in: req.body.category } }
    }
    
    if(req.body.style != undefined && req.body.style.length > 0) {
      filter = { style: { $in: req.body.style } }
    }
    
    if(req.body.material != undefined && req.body.material.length > 0) {
      filter = { material: { $in: req.body.material } }
    }
    
    if(req.body.gemStone != undefined && req.body.gemStone.length > 0) {
      filter = { gemStone: { $in: req.body.gemStone } }
    }

    if(req.body.theme != undefined && req.body.theme.length > 0) {
      filter = { theme: { $in: req.body.theme } }
    }
    
    if(req.body.length != undefined && req.body.length.length > 0) {
      filter = { length: { $in: req.body.length } }
    }

    if(req.body.sku != undefined && req.body.sku != "") {
      filter = { sku: req.body.sku }
    }

    if(req.body.name != undefined) {
      filter = { name: { $in: req.body.name } }
    }

    const product = await ProductDiamond.aggregate([
      {
        $match: filter
      },
      {
        $unwind: {
          path: "$labourChargeType",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "labourchargetypes",
          let: { uid: "$labourChargeType", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "labourChargeType"
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "categories",
          let: { uid: "$category", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "category"
        }
      },
      {
        $unwind: {
          path: "$metals",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "pricetypemasters",
          localField: "metals.priceType",
          foreignField: "_id",
          as: "metals.priceType"
        }
      },
      {
        $lookup: {
          from: "metaltypemasters",
          localField: "metals.metalType",
          foreignField: "_id",
          as: "metals.metalType"
        }
      },
      {
        $group: {
          _id: "$_id",
          category: { $addToSet: {$first: "$category"} },
          labourChargeType: { $addToSet: { $first: "$labourChargeType" } },
          metals: { $addToSet: { priceType: { $first: "$metals.priceType" },  metalType: { $first: "$metals.metalType" } } },
          name: { $first: "$name" },
          sku: { $first: "$sku" },
          hsnCode: { $first: "$hsnCode" },
          uid: { $first: "$uid" },
          mainImage_url: { $first: "$mainImage_url" }
        }
      }  
    ])
      res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});


const getProductJewelPublic = async(req, res, next) => {
  try {
    const product = await ProductDiamond.aggregate([
      {
        $match: {
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
          language_id: new mongoose.Types.ObjectId(req.user.language_id),
          uid: req.params.id
        }
      },      
      {
        $lookup: {
          from: "productcostvariations",
          let: { id: "$_id", country_id: new mongoose.Types.ObjectId(req.user.country_id) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$id", "$product_id"] },
/*                     { $eq: ["$$country_id", "$country_id"] }
 */                  ]
                }
              }
            }
          ],
          as: "prices"
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "categories",
          let: { uid: "$category", language_id: new mongoose.Types.ObjectId(req.user.language_id), accCompany_id: new mongoose.Types.ObjectId(req.companyId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$accCompany_id","$accCompany_id"] },
                    { $eq: ["$$language_id","$language_id"] },
                    { $eq: ["$$uid","$uid"] },
                  ]
                }
              }
            }
          ],
          as: "category"
        }
      },
      {
        $unwind: {
          path: "$metals",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "pricetypemasters",
          localField: "metals.priceType",
          foreignField: "_id",
          as: "metals.priceType"
        }
      },
      {
        $lookup: {
          from: "metaltypemasters",
          localField: "metals.metalType",
          foreignField: "_id",
          as: "metals.metalType"
        }
      },
      {
        $group: {
          _id: "$_id",
          category: { $addToSet: {  name: { $first:  "$category.name", }, uid: { $first:  "$category.uid", } } },
          metals: { $addToSet: { priceType: { name: { $first: "$metals.priceType.name" }, uid: { $first: "$metals.priceType.uid" } },  metalType: { name: { $first: "$metals.metalType.name" }, uid: { $first: "$metals.metalType.uid" } } } },
          name: { $first: "$name" },
          sku: { $first: "$sku" },
          hsnCode: { $first: "$hsnCode" },
          uid: { $first: "$uid" },
          mainImage_url: { $first: "$mainImage_url" },
          gallary_image: { $first: "$gallary_image" },
          isPriceFixed: { $first: "$isPriceFixed" },
          isCustomizable: { $first: "$isCustomizable" },
          prices: { $first: {$first: "$prices"} },
          length: {$first: "$length"},
          width: { $first: "$width" },
          height: { $first: "$height" },
          shortDes: { $first: "$shortDes" },
          longDes: {$first: "$longDes"}
        }
      }
    ]);

    if(product.length == 0) {
      throw new Error("Product not found");
    }

    res.json({
      product: product[0]
    })
  }
  catch(error) {
    throw new Error(error);
  }
}


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  getaFeaturedProduct,
  searchProduct,
  getFilterProduct,
  getAllProductAdmin,
  getSellerProductList,
  getFilterProductByCat,
  getFilterProductByBrand,
  updateProductFeature,
  updateSellerProductFeature,
  getAllProductPagination,
  addProductVariationForm,
  trendingSearches,
  getAllSellerProductList,
  getProductAdmin,
  flashDealsList,
  productCount,
  updateActiveStatus,
  sortProducts,
  sortProductsByCategory,
  getProductPrice,
  variationPriceUpdate,
  createProductDiamond,
  productUnderPrice,
  jewelProduct,
  jewelProductGetById,
  updateProductDiamond,
  productDiamonFilter,
  isProductNameExist,
  isProductSKUExist,
  isProductSlugExist,
  diamondProductDelete,
  jewelProductFilterAdmin,
  getProductJewelPublic
};
