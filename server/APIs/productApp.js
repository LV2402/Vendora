import exp from 'express';
const productApp = exp.Router();
import ProductModel from '../models/productModel.js';

// Add product
productApp.post("/product", async (req, res) => {
    try {
        let newproduct = req.body;
        let productDoc = new ProductModel(newproduct);
        await productDoc.save();
        res.send({ message: "product added successfully" });
    } catch (err) {
        res.send({ message: "error", payload: err.message });
    }
});

// Get all products
productApp.get("/products/:sellerId", async (req, res) => {
    try {
        const prodList = await ProductModel.find({sellerId: req.params.sellerId});
        res.send({ message: "products", payload: prodList });
    } catch (err) {
        res.send({ message: "error", payload: err.message });
    }
});



// Update product
productApp.put("/product/:_id", async (req, res) => {
    try {
        let modifiedProduct = req.body;
        let updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: modifiedProduct._id },
            { $set: { ...modifiedProduct } },
            { new: true }
        );
        res.send({ message: "Product updated successfully", payload: updatedProduct });
    } catch (err) {
        res.send({ message: "error", payload: err.message });
    }
});

// Delete product
productApp.delete("/product/:_id",async(req,res)=>{
    try{
        let deleteProduct=await ProductModel.findByIdAndDelete(req.params._id);
        res.send({ message: "Product deleted successfully", payload: deleteProduct });
    }catch (err) {
        res.send({ message: "error", payload: err.message });
    }
})

export default productApp;