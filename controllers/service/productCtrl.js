const ProductModel = require("../../models/service/productModel")
const UserModel = require("../../models/user/userModel")
const getProduct = async(req,res,next)=>{
    try{
        let user_id = req.user
        const user = await UserModel.findById(user_id)
        // console.log(user.wishlist)
        const wishlist = JSON.parse(JSON.stringify(user?.wishlist)) || [];
        const Product = await ProductModel.find();
        const list = JSON.parse(JSON.stringify(Product)).map(items=> ({wishlist:wishlist.find(id=>items._id == id )? true : false, ...items}))
        res.data = list
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const getProductByCategory = async (req, res, next) => {
    try {
      const category = req.body.category;
      let user_id = req.user
      const user = await UserModel.findById(user_id)
      const wishlist = user?.wishlist || [];
        console.log(user)

      let products;
      if (!category || category.length === 0) {
        products = await ProductModel.find();
      } else {
        products = await ProductModel.find({ category_id: { $in: category } });
      }
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found", statusCode: 404 });
      }

      const list = JSON.parse(JSON.stringify(products)).map(items=> ({wishlist:JSON.parse(JSON.stringify(wishlist)).find(id=>items._id == id )? true : false, ...items}))
  
      res.status(200).json({ message: "Success", statusCode: 200, data: list });
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: true, statusCode: 500, message: error.message, data: {} });
    }
  };
  

const getProductById = async(req,res,next)=>{
    try{
        const Product = await ProductModel.findById(req.params.id);
        res.data = Product
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const addProduct = async(req,res,next)=>{
    try{
        const Product = await ProductModel.create(req.body);
        res.data = Product
        res.status_Code = "200",
        res.message = 'Product Added Successfully'
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const updateProduct = async(req,res,next)=>{
    try{
        const Product = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Product
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deleteProduct = async(req,res,next)=>{
    try{
        const Product = await ProductModel.findByIdAndDelete(req.params.id);
        res.data = Product
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

module.exports = {getProduct, getProductById, addProduct, updateProduct, deleteProduct, getProductByCategory}
