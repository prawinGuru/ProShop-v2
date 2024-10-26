import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @desc     Fetch all Prouducts from DB
// @route    GET/api/products
// @access   Public
const getProducts = asyncHandler(async(req, res) => {
    // {} - fetches all products
    const products = await Product.find({});
    res.json(products);
});

// @desc     Fetch a Prouduct
// @route    GET/api/products/:id
// @access   Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
        if(product){
           return res.json(product);
        }
        else{
            res.status(404);
            throw new Error('Resource Not Found!');
        }
})

export default {getProducts, getProductById};