import ProductsModule from "../models/Products.js";

async function products_updateProduct(req, res) {
    try {
        const { theProduct } = req.body;
        await ProductsModule.updateOne({ _id: theProduct._id }, { $set: theProduct });
        res.status(200).json(true);
    } catch (error) {
        res.status(500).json(false);
    }
}

export default products_updateProduct;
