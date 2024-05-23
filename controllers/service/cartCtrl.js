const CartModel = require("../../models/service/cartModel")

const getCart = async(req,res,next)=>{
    try{
        const Cart = await CartModel.findOne({user_id:req.user}).populate({
            path: 'products.product_id',
            populate: {
                path: 'category_id',
                model: 'ProductCategory',
                select:'category_name'
            }
        })
        res.data = Cart
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

const getCartById = async(req,res,next)=>{
    try{
        const Cart = await CartModel.findById(req.params.id);
        res.data = Cart
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

const addCart = async(req,res,next)=>{
    const { product_id, qty } = req.body;
    const  id  = req.user;
    console.log(id)
    console.log(product_id)
    console.log(qty)
    try {
        if (!product_id || !qty || qty == 0) {
            return res.json({
                // __requestResponse("400", "Prouct Not Found", {
                //     qty: "Quantity must be greater than 0",
                statusCode: "400", 
                message:"Prouct Not Found",
                qty: "Quantity must be greater than 0",
            })
        }

        const cart = await CartModel.findOneAndUpdate(
            { user_id: id, "products.product_id": product_id },
            { $set: { "products.$.qty": qty } },
            { new: true }
        );

        if (!cart) {
            const updatedCart = await CartModel.findOneAndUpdate(
                { user_id: id },
                {
                    $addToSet: { products: { product_id, qty } },
                    $setOnInsert: { user_id: id },
                },
                { new: true, upsert: true }
            );

            // __cartNodeCache(id);
            // return res.json(__requestResponse("200", __SUCCESS, updatedCart));
            return res.json({statusCode:"200", message:"success", updatedCart});
        }
        // __cartNodeCache(id);
        // return res.json(__requestResponse("200", __SUCCESS, cart));
        return res.json({statusCode:"200", message:"success", cart});
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.json(
                // __requestResponse("406", __FIELD_ERROR, validationErrors)
                {statusCode:"406", message:error.message, validationErrors}
            );
        } else {
            // return res.json(__requestResponse("500", __SOME_ERROR, error));
            return res.json({statusCode:"500", message:error.message, error});
        }
    }
    // try{
    //     let user_id = req.user
    //     req.body.user_id = user_id
    //     const Cart = await CartModel.create(req.body);
    //     res.data = Cart
    //     res.status_Code = "200"
    //     res.message = 'Product added to cart successfully'
    //     next()
    // }catch(error){
    //     res.error = true;
    //     res.status_Code = "403";
    //     res.message = error.message
    //     res.data = {}
    //     next()
    // }
}

const updateCart = async(req,res,next)=>{

    const id  = req.user;
    const { productId } = req.params;
    const { qty } = req.body;
    console.log(productId)
    console.log(qty)
    console.log(id)
    try {
        const cart = await CartModel.findOneAndUpdate(
            { user_id: id, "products._id": productId },
            { $set: { "products.$.qty": qty } },
            { new: true }
        ).populate({
            path: "products.product_id",
            select: "productName priceINR priceUSD offerPriceUSD offerPriceINR",
        });
        console.log(cart)

        if (!cart) {
            return res.json(
                // __requestResponse("404", "Cart or Product not found")
                {statusCode:"404", message:"Cart or Product not found"}
            );
        }

        const newCart = JSON.parse(JSON.stringify(cart));
        res.json({statusCode:'200', message:'Product updated successfully', newCart})
        // __setNodeCache("cart" + id, newCart);

        // const summary = __calculateTotal(JSON.parse(newCart).products);
        // return res.json(
        //     __requestResponse("200", __SUCCESS, {
        //         ...JSON.parse(newCart),
        //         summary,
        //     })
        // );
    } catch (error) {
        console.log(error);
        return res.json(__requestResponse("500", __SOME_ERROR, error));
    }
    // try{
    //     const Cart = await CartModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    //     res.data = Cart
    //     res.status_Code = "200"
    //     next()
    // }catch(error){
    //     res.error = true;
    //     res.status_Code = "403";
    //     res.message = error.message
    //     res.data = {}
    //     next()
    // }
}

const deleteCart = async(req,res,next)=>{

    const id = req.user;
    const { productId } = req.params;
    console.log(productId)

    try {
        const cart = await CartModel.findOneAndUpdate(
            { user_id: id },
            { $pull: { products: { _id: productId } } },
            { new: true }
        ).populate({
            path: "products.product_id",
            select: "productName priceINR priceUSD offerPriceUSD offerPriceINR",
        });

        if (!cart) {
            return res.json(
                // _requestResponse("404", "_NOT_FOUND", "Cart not found")
                {statusCode:"404", /* "_NOT_FOUND", */ message:"Cart not found"}
            );
        }
        const newCart = JSON.parse(JSON.stringify(cart));
        res.json({statusCode:'200', message:'Product deleted successfully', newCart})
        // __setNodeCache("cart" + id, newCart);

        // const summary = __calculateTotal(JSON.parse(newCart).products);
        // return res.json(
        //     __requestResponse("200", __SUCCESS, {
        //         ...JSON.parse(newCart),
        //         summary,
        //     })
        // );
    } catch (error) {
        console.log(error);
        // return res.json(__requestResponse("500", __SOME_ERROR, error));
        return res.json({statusCode:"500", /* __SOME_ERROR, */message: error.message});
    }

    // try{
    //     const Cart = await CartModel.findByIdAndDelete(req.params.id);
    //     res.data = Cart
    //     res.status_Code = "200"
    //     next()
    // }catch(error){
    //     res.error = true;
    //     res.status_Code = "403";
    //     res.message = error.message
    //     res.data = {}
    //     next()
    // }
}



module.exports = {getCart, getCartById, addCart, updateCart, deleteCart}
