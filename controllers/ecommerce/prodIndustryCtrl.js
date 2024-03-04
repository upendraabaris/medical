const Industry = require("../../models/ecommerce/prodIndustryModel");
// const asyncHandler = require("express-async-handler");
// const slugify = require("slugify");
// const validateMongoDbId = require("../utils/validateMongodbId");
// const cloudinary = require("../utils/cloudinary");
// const path = require("path");
// __dirname = path.resolve(path.dirname(__filename), "../");
// const Sequence = require("../models/SequenceUidMaster/industrySequencyModel");
// const mongoose = require("mongoose");
// const ProductCostVariation = require("../models/productCostVariationModel");
// const Language = require("../models/languageModel");
// const Client = require("../middlewares/redis");

const createIndustry = (async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;

    if (req.body.parent_id == "null" || req.body.parent_id == null) {
      req.body.parent_id = undefined;
    }
    let sequence = await Sequence.findOne({
      accCompany_id: req.companyId,
    });

    if (sequence == null) {
      sequence = await Sequence.create({
        accCompany_id: req.companyId,
        sequence: 0,
      });
    }
    let seq = await Sequence.findByIdAndUpdate(
      sequence._id,
      {
        $inc: { sequence: 1 },
      },
      { new: true }
    );

    req.body.uid = seq.sequence;
    let categories = [];

    let catNames = [];
    const language = await Language.findOne({ accCompany_id: req.companyId, name: "English" });
      console.log(language);
    let slug;
    req.body.list.forEach((categ) => {
      if(String(categ.language_id) == String(language._id)) {
        slug = categ.slug;
      }
      catNames.push(categ.name);
    });

    if(slug == undefined) {
      throw new Error("Please enter slug");
    }


    let found = await Industry.findOne({
      accCompany_id: req.companyId,
      name: { $in: catNames },
    });
    if (found != null) {
      throw new Error("Industry Already exist");
    }

    

    req.body.list.forEach((item) => {
/*       if (item.name) {
        item.slug = slugify(item.name);
      }
 */      if (item.parent_id == "null") {
        item.parent_id = undefined;
      }
      item.slug = slug;
      item.uid = req.body.uid;
      item.accCompany_id = req.companyId;
      categories.push(Industry.create(item));
    });

    Promise.all(categories).then(async (result) => {
      let allKeys = await Client.keys(`*:industry:${req.companyId}:*`);
      if(allKeys.length != 0) {
        const del = await Client.del(allKeys);
      }

      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateIndustry = (async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let categories = [];
    req.body.list.forEach((categ) => {
      categories.push(Industry.findById(categ._id));
    });

    const language = await Language.findOne({ accCompany_id: req.companyId, name: "English" });

    let slug;
    req.body.list.forEach((categ) => {
      if(String(categ.language_id) == String(language._id)) {
        slug = categ.slug;
      }
    });

    if(slug == undefined) {
      throw new Error("Please enter slug");
    }

    let foundSlug = await Industry.findOne({ slug: slug, accCompany_id: req.companyId, uid: { $ne: req.params.id } });

    if(foundSlug != null) {
      throw new Error("Slug already exist!");
    }

    Promise.all(categories).then((result) => {
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
        let updateIndustry = [];
        req.body.list.forEach((item) => {
          item.slug = slug;
          if(item.parent_id == null || item.parent_id == "null") {
            item.parent_id = undefined;
          }
          updateIndustry.push(
            Industry.findByIdAndUpdate(item._id, item, { new: true })
          );
        });
        Promise.all(updateIndustry).then(async (categories) => {
          let allKeys = await Client.keys(`*:industry:${req.companyId}:*`);
          const allKeys1 = await Client.keys(
            `*product:${req.companyId}:*`
          );

          if(allKeys.length != 0) {
          const del = await Client.del(allKeys);
          }
          res.json(categories);
        });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteIndustry = (async (req, res) => {
  try {
    let categories = await Industry.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedIndustry = [];
    categories?.forEach((item) => {
      deletedIndustry.push(Industry.findByIdAndDelete(item._id));
    });
    Promise.all(deletedIndustry).then(async (result) => {
      let allKeys = await Client.keys(`*:industry:${req.companyId}:*`);
      if(allKeys.length != 0) {
      const del = await Client.del(allKeys);
      }
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getIndustry = (async (req, res) => {
  const { id } = req.params;
  //   validateMongoDbId(id);
  try {
    const categories = await Industry.find({
      uid: id,
      accCompany_id: req.companyId,
    }).populate("parent_id").sort({"order_level": 1});

/*     await Client.get("catList:" + req.companyId)

    if()    

 */    return res.json(categories);
  } catch (error) {
    throw new Error(error);
  }
});

const getallIndustry = (async (req, res) => {
  try {
    if(req.type == 'Staff' || req.type == 'Seller') {    
      const industry = await Industry.find({
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
      });
      res.json(industry);
    }
    else {
      throw new Error("You are not Authorize");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchIndustry = (async (req, res) => {
  try {
    const getSearchedIndustry = await Industry.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
      approve: true,
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    }).populate("parent_id");
    return res.json(getSearchedIndustry);
  } catch (error) {
    throw new Error(error);
  }
});

const parentIndustryList = (async (req, res) => {
  try {
    let categ = await Client.get(`parentIndustryList:industry:${req.companyId}:${req.user.language_id}`);
    if(categ==null) {
    const getCatList = await Industry.find({
      level: "0",
      approve: true,
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    });
    await Client.set(`parentIndustryList:industry:${req.companyId}:${req.user.language_id}`, JSON.stringify(getCatList))    
    return res.json(getCatList);
  }
  else {
    console.log("what");
    return res.json(JSON.parse(categ));
  }
  } catch (error) {
    throw new Error(error);
  }
});

const childIndustryList = (async (req, res) => {
  try {
    const catChild = await Client.get(`childIndustryList:industry:${req.companyId}:${req.user.language_id}:${req.params.id}`)
    if(catChild == null) {
    let categ = await Industry.find({ accCompany_id: req.companyId, approve: true, uid: req.params.id });
    let  cateList = [];

    categ.forEach((cat) => {
      cateList.push(cat._id);
    })

    let getCatList = await Industry.find({
      //approve: true,
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
      parent_id: { $in: cateList }
    });
    await Client.set(`childIndustryList:industry:${req.companyId}:${req.user.language_id}:${req.params.id}`, JSON.stringify(getCatList));
    return res.json(getCatList);
    }
    else {
      return res.json(JSON.parse(catChild))
    }
} catch (error) {
    throw new Error(error);
  }
});

const singleFilterIndustryList = (async (req, res) => {
  try {
    const  categ = await Client.get(`singleFilterIndustryList:industry:${req.companyId}:${req.user.language_id}`);
    if(categ == null) {
    let getCatList = await Industry.find({
      approve: true,
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    });
    let CatList = [];

    let subMenu = [];
    let parentCat = [];
    getCatList.forEach(async (cat) => {
      if (cat.level == "0") {
        parentCat.push(Industry.find({ accCompany_id: req.companyId, uid: cat.uid, level: cat.level }));
        /*         let Cat = { title: cat, Submenu: [] };
        getCatList.forEach((cats) => {
          if (String(Cat.title._id) == String(cats.parent_id)) {
            Cat.Submenu.push(cats);
          }
        });
        CatList.push(Cat);
 */      }
    });
    Promise.all(parentCat).then((result) => {
      result?.forEach((parent) => {
        let parents = []
        parent?.forEach((par) => {
          parents.push(par?._id);
        });
        subMenu.push(Industry.find({ accCompany_id: req.companyId, language_id: req.user.language_id, parent_id: {$in: parents} }))          

      })
      Promise.all(subMenu).then(async (menus) => {
        getCatList.forEach((cat) => {
          if (cat.level == "0") {
            let parents = [];
            result.forEach((parent) => {
              parent.forEach((par) => {
                if(String(cat.uid) == String(par.uid)) {
                  parents.push(par._id);
                }
              })
            });
            
            let Cat = { title: cat, Submenu: [] };
            getCatList.forEach((cats) => {
              parents.forEach((par) => {
                if (String(par) == String(cats.parent_id)) {
                  Cat.Submenu.push(cats);
                }  
              })
            });
            CatList.push(Cat);
          }
      })
      await Client.set(`singleFilterIndustryList:industry:${req.companyId}:${req.user.language_id}`,   JSON.stringify(CatList));
      res.json(CatList);

    })
    });
  }
  else {
    return res.json(JSON.parse(categ));
  }
  } catch (error) {
    throw new Error(error);
  }
});

const industryCount = (async (req, res) => {
  try {
    let count = await Industry.find({ accCompany_id: req.companyId }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const updateIndustryStatus = (async (req, res) => {
  try {
    let categ = await Industry.findByIdAndUpdate(
      req.params.id,
      {
        approve: req.body.approve,
      },
      {
        new: true,
      }
    );
    res.json(categ);
  } catch (error) {
    throw new Error(error);
  }
});

const publicCategories = (async (req, res) => {
  try {
    console.log(req.user.language_id);
    let categ = await Client.get(`PublicCateg:industry:${req.companyId}:${req.user.language_id}`);
    if(categ == null) {
      const categories = await Industry.find({
        approve: true,
        accCompany_id: req.companyId,
        language_id: req.user.language_id,
      });
      await Client.set(`PublicCateg:industry:${req.companyId}:${req.user.language_id}`, JSON.stringify(categories));
      return res.json(categories);
    }
    else {
      console.log("what");
      return res.json(JSON.parse(categ));
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getIndustryListByLangCateg = (async (req, res) => {
  try {
    let ids = [];
    req.body.ids.forEach((id) => {
      ids.push(new mongoose.Types.ObjectId(id));
    });
    const getIndustryType = await Industry.aggregate([
      {
        $match: {
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
          parent_id: { $in: ids },
          language_id: new mongoose.Types.ObjectId(req.user.language_id)
        },
      },
    ]);
    res.json(getIndustryType);
  } catch (error) {
    throw new Error(error);
  }
});

const filterIndustryWithProduct = (async (req, res) => {
  try {
    let generalSetting = await GeneralSetting.findOne({
      parent_id: "64882bf65ec65f7ca4cf04bf",
      accCompany_id: req.companyId,
    });

    if (generalSetting?.featured == "true") {
    let categ = await Client.get(`FilterCategWithProduct:industry:${req.companyId}:${req.user.language_id}:${req.user.country_id}`);
    if(categ == null) {
      const categories = await Industry.aggregate([
        {
          $match: {
            featured: true,
            approve: true,
            accCompany_id: new mongoose.Types.ObjectId(req.companyId),
            language_id: new mongoose.Types.ObjectId(req.user.language_id),
          },
        },
        {
          $lookup: {
            from: "product_tests",
            localField: "_id",
            foreignField: "industry_id",
            let: {
              featured: true,
              industry_id: ["$_id"],
              language_id: new mongoose.Types.ObjectId(req.user.language_id),
              accCompany_id: new mongoose.Types.ObjectId(req.companyId),
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$featured", "$$featured"] },
                      { $eq: ["$$language_id", "$language_id"] },
                      { $eq: ["$$accCompany_id", "$accCompany_id"] },
                      { $eq: ["$approve", true] },
                      {
                        $setIntersection: ["$industry_id", "$$industry_id"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "list",
          },
        },
         {
          $project: {
            _id: "$_id",
            order: "$order_level",
            industryUid: "$uid",
            industryName: "$name",
            list: "$list",
            size: { $size: "$list" },
            banner: "$banner",
          },
        },
       {
          $match: {
            size: { $gt: 0 },
          },
        },
        {
          $sort: {
            order: 1
          }
        }
      ]);

      let productVariations = []

      categories?.forEach((categ) => {
        categ.list.forEach((product) => {
          productVariations.push(ProductCostVariation.findOne({ product_id: product._id, variant_id: product.variations[0]._id, seller_id: product.seller_id, country_id:req.user.country_id }).populate({ path:  "country_id", populate: "currency_id" }))
        })
      })
      Promise.all(productVariations).then(async (result) => {
        result.forEach((price) => {
          categories.forEach((categ) => {categ.list?.forEach((product) => {
            if(String(price.product_id) == String(product._id) && String(price.variant_id) == String(product.variations[0]._id) && String(price.seller_id) == String(product.seller_id) ) {
              product.prices = price;
            }
          });
        });
        });
        await Client.set(`FilterCategWithProduct:industry:${req.companyId}:${req.user.language_id}:${req.user.country_id}`, JSON.stringify(categories))
        await Client.expire(72000);
        res.json(categories);
      });
    }
    else {
      console.log("success");
      res.json(JSON.parse(categ));
    }
  }
  else {
    res.json([]);
  }
  } catch (error) {
    throw new Error(error);
  }
});

const featuredOnlyCat = (async (req, res) => {
  try {
    const  cate = await Client.get(`featuredOnlyCat:industry:${req.companyId}:${req.user.language_id}`);
    if(cate == null){
      const categ = await Industry.find({ accCompany_id: req.companyId, featured: true, approve: true, language_id: req.user.language_id });
      await Client.get(`featuredOnlyCat:industry:${req.companyId}:${req.user.language_id}`, JSON.stringify(categ));

      return res.json({ response: { status: 200, message: "success" }, categ});
    }
    else {
      return res.json({ response: { status: 200, message: "success" }, categ: JSON.parse(cate)});
    }
  }
  catch(error) {
    throw new Error(error);
  }
});

const industryDetailPublic = (async (req, res) => {
  try {
    const  categCache = await Client.get(`industryDetailPage:industry:${req.companyId}:${req.user.language_id}:${req.params.id}`);
    if(categCache == null) {
    const categ = await Industry.findOne({accCompany_id: req.companyId, language_id: req.user.language_id, uid: req.params.id});
    await Client.set(`industryDetailPage:industry:${req.companyId}:${req.user.language_id}`, JSON.stringify(categ));
    return res.json(categ);
    }
    else {
      return res.json(JSON.parse(categCache));
    }
  }
  catch(error) {
    throw new Error(error);
  }
})

module.exports = {
  createIndustry,
  deleteIndustry,
  updateIndustry,
  getIndustry,
  getallIndustry,
  parentIndustryList,
  childIndustryList,
  singleFilterIndustryList,
  industryCount,
  publicCategories,
  getIndustryListByLangCateg,
  filterIndustryWithProduct,
  featuredOnlyCat,
  industryDetailPublic,
  updateIndustryStatus
};
