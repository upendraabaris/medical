const Blogs = require("../../models/ecommerce/blogModel");
// const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../utils/validateMongodbId");
// const Sequence = require("../models/blogSequenceModel");
// const Language = require("../models/languageModel");
// const Client = require("../middlewares/redis");

const createBlogs = (async (req, res) => {
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

    let foundSlug = await Blogs.findOne({ slug: slug, accCompany_id: req.companyId });

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
      item.slug = slug;
      item.accCompany_id = req.companyId;
      attributes.push(Blogs.create(item));
    });

    Promise.all(attributes).then(async (result) => {
      let allKeys = await Client.keys(`*:blogs:${req.companyId}:*`);
      if(allKeys.length != 0) {
      const del = await Client.del(allKeys);
      }  

      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogs = (async (req, res) => {
  const { id } = req.params;
  try {
    let BlogsAuth = [];
    let slug;
    req.body.list.forEach((categ) => {
      if(String(categ.language_id._id) == String(language._id)) {
        slug = categ.slug;
      }
    });

    if(slug == undefined) {
      throw new Error("Please enter slug");
    }

    let foundSlug = await Blogs.findOne({ slug: slug,accCompany_id: req.companyId });

    if(foundSlug!= null) {
      throw new Error("slug is already exist");
    }
    req.body.list.forEach((item) => {
      BlogsAuth.push(Blogs.findById(item._id));
    });
    Promise.all(BlogsAuth)
      .then((result) => {
        let Blogss = [];
        result.forEach((item) => {
          if (String(item.accCompany_id) != String(req.companyId)) {
            throw new Error(
              "Either you are not Authorize or something went wrong!"
            );
          }
        });
        req.body.list.forEach((item) => {
          item.slug = slug;
          Blogss.push(
            Blogs.findByIdAndUpdate(item._id, item, {
              new: true,
            })
          );
        });
        Promise.all(Blogss)
          .then(async (result) => {
            let allKeys = await Client.keys(`*:blogs:${req.companyId}:*`);
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

const deleteBlogs = (async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let Blogss = await Blogs.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedBlogs = [];
    Blogss?.forEach((item) => {
      deletedBlogs.push(Blogs.findByIdAndDelete(item._id));
    });
    Promise.all(deletedBlogs).then(async (result) => {
      let allKeys = await Client.keys(`*:blogs:${req.companyId}:*`);
      if(allKeys.length != 0) {
      const del = await Client.del(allKeys);
      }  

      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogs = (async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const getaBlogs = await Blogs.find({
      accCompany_id: req.companyId,
      uid: id,
    });
    res.json(getaBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogsPublicList = (async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    console.log("lang",req.user.language_id);

    const publicBlog = await Client.get(`getBlogsPublicList:blogs:${req.companyId}:${req.user.language_id}`);
    if(publicBlog == null) {
      const getaBlogs = await Blogs.find({
        active: true,
        accCompany_id: req.companyId,
        language_id: req.user.language_id
      });
      await Client.set(`getBlogsPublicList:blogs:${req.companyId}`, JSON.stringify(getaBlogs));
      await Client.expire(`getBlogsPublicList:blogs:${req.companyId}`, 36000);
      res.json(getaBlogs);  
    }
    else {
      res.json(JSON.parse(publicBlog));
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getallBlogs = (async (req, res) => {
  try {
    const getallBlogs = await Blogs.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    });
    res.json(getallBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogPublic = (async (req, res) => {
  try {
    const blog = await Client.get(`getBlogPublic:blogs:${req.companyId}:${req.user.language_id}:${req.params.id}`)
    if(blog == null) {

    const getallBlogs = await Blogs.findOne({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
      uid: req.params.id
    });
    await Client.set(`getBlogPublic:blogs:${req.companyId}:${req.user.language_id}:${req.params.id}`, JSON.stringify(getallBlogs));
    await Client.expire(`getBlogPublic:blogs:${req.companyId}:${req.user.language_id}:${req.params.id}`, 3600)
    res.json(getallBlogs);
  }
  else {
    res.json(JSON.parse(blog))
  }
  } catch (error) {
    throw new Error(error);
  }
});

const getallBlogsByLang = (async (req, res) => {
  try {
    const getallBlogs = await Blogs.find({
      accCompany_id: req.companyId,
      language_id: req.params.id,
    });
    res.json(getallBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchBlogs = (async (req, res) => {
  try {
    const getSearchedBlogs = await Blogs.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
      accCompany_id: req.companyId,
    });
    res.json(getSearchedBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const BlogsCount = (async (req, res) => {
  try {
    const count = await Blogs.find({ accCompany_id: req.companyId }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const BlogsUpdateStatus = (async (req, res) => {
  try {
    const Blogs = await Blogs.findByIdAndUpdate(req.params.id, {
      active: req.body.active,
      accCompany_id: req.companyId,
    });
    res.json(Blogs);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogsByCateg = (async (req, res) => {
  try {
    const blogs = await Client.get(`getBlogsByCateg:blogs:${req.companyId}:${req.user.language_id}:${req.params.id}`);
    if(blogs == null) {
      const getaBlogs = await Blogs.find({
        accCompany_id: req.companyId,
        category_id: req.params.id,
        language_id: req.user.language_id
      });
      await Client.set(`getBlogsByCateg:blogs:${req.companyId}:${req.user.language_id}:${req.params.id}`, JSON.stringify(getaBlogs));
      res.json(getaBlogs);
    }
    else {
      res.json(JSON.parse(blogs));
    }
  }
  catch(error) {
    throw new Error(error);
  }
})

module.exports = {
  createBlogs,
  updateBlogs,
  deleteBlogs,
  getBlogs,
  getallBlogs,
  getallBlogsByLang,
  getSearchBlogs,
  BlogsCount,
  getBlogsPublicList,
  BlogsUpdateStatus,
  getBlogsByCateg,
  getBlogPublic
};
