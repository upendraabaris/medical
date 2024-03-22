const blogsCat = require("../../models/ecommerce/blogCatModel");
const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../utils/validateMongodbId");
const Sequence = require("../../models/ecommerce/blogsCatSquenceModel");
// const Language = require("../models/languageModel");

const createblogsCat = asyncHandler(async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;
    
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

    let foundSlug = await blogsCat.findOne({ slug: slug, accCompany_id: req.companyId });

    if(foundSlug!= null) {
      throw new Error("slug is already exist");
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
    let attributes = [];

    req.body.list.forEach((item) => {
      item.uid = req.body.uid;
      item.accCompany_id = req.companyId;
      attributes.push(blogsCat.create(item));
    });

    Promise.all(attributes).then(async (result) => {
      let allKeys = await Client.keys(`blogCats:${req.companyId}:*`);
      if(allKeys.length != 0) {
      const del = await Client.del(allKeys);
      }  

      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateblogsCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let blogsCatAuth = [];
    let slug;
    req.body.list.forEach((categ) => {
      if(String(categ.language_id._id) == String(language._id)) {
        slug = categ.slug;
      }
    });

    if(slug == undefined) {
      throw new Error("Please enter slug");
    }

    let foundSlug = await blogsCat.findOne({ slug: slug,accCompany_id: req.companyId });

    if(foundSlug!= null) {
      throw new Error("slug is already exist");
    }
    req.body.list.forEach((item) => {
      blogsCatAuth.push(blogsCat.findById(item._id));
    });
    Promise.all(blogsCatAuth)
      .then((result) => {
        let blogsCats = [];
        result.forEach((item) => {
          if (String(item.accCompany_id) != String(req.companyId)) {
            throw new Error(
              "Either you are not Authorize or something went wrong!"
            );
          }
        });
        req.body.list.forEach((item) => {
          blogsCats.push(
            blogsCat.findByIdAndUpdate(item._id, item, {
              new: true,
            })
          );
        });
        Promise.all(blogsCats)
          .then(async (result) => {
            let allKeys = await Client.keys(`blogCats:${req.companyId}:*`);
            if(allKeys.length != 0) {
            const del = await Client.del(allKeys);
            }        
            res.json(result);
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteblogsCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let blogsCats = await blogsCat.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedblogsCat = [];
    blogsCats?.forEach((item) => {
      deletedblogsCat.push(blogsCat.findByIdAndDelete(item._id));
    });
    Promise.all(deletedblogsCat).then(async (result) => {
      let allKeys = await Client.keys(`blogCats:${req.companyId}:*`);
      if(allKeys.length != 0) {
      const del = await Client.del(allKeys);
      }  

      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getblogsCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const getablogsCat = await blogsCat.find({
      accCompany_id: req.companyId,
      uid: id,
    });
    res.json(getablogsCat);
  } catch (error) {
    throw new Error(error);
  }
});

const getblogsCatPublicList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const getablogsCat = await blogsCat.find({
      active: true,
      accCompany_id: req.companyId,
    });
    res.json(getablogsCat);
  } catch (error) {
    throw new Error(error);
  }
});

const getallblogsCat = asyncHandler(async (req, res) => {
  try {
    const blogs = await Client.get(`blogCats:${req.companyId}:${req.user.language_id}`);
    if(blogs == null) {
    const getallblogsCat = await blogsCat.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    });
    await Client.set(`blogCats:${req.companyId}:${req.user.language_id}`, JSON.stringify(getallblogsCat));
    res.json(getallblogsCat);
  }
  else {
    res.json(JSON.parse(blogs));
  }
  } catch (error) {
    throw new Error(error);
  }
});

const getallblogsCatByLang = asyncHandler(async (req, res) => {
  try {
    const getallblogsCat = await blogsCat.find({
      accCompany_id: req.companyId,
      language_id: req.params.id,
    });
    res.json(getallblogsCat);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchblogsCat = asyncHandler(async (req, res) => {
  try {
    const getSearchedblogsCat = await blogsCat.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
      accCompany_id: req.companyId,
    });
    res.json(getSearchedblogsCat);
  } catch (error) {
    throw new Error(error);
  }
});

const blogsCatCount = asyncHandler(async (req, res) => {
  try {
    const count = await blogsCat.find({ accCompany_id: req.companyId }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const blogsCatUpdateStatus = asyncHandler(async (req, res) => {
  try {
    const blogsCat = await blogsCat.findByIdAndUpdate(req.params.id, {
      active: req.body.active,
      accCompany_id: req.companyId,
    });
    res.json(blogsCat);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createblogsCat,
  updateblogsCat,
  deleteblogsCat,
  getblogsCat,
  getallblogsCat,
  getallblogsCatByLang,
  getSearchblogsCat,
  blogsCatCount,
  getblogsCatPublicList,
  blogsCatUpdateStatus,
};
