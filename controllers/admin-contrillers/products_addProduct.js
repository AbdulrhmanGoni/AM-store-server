import ProductsModule from "../../models/Products.js";

async function products_addProduct(req, res) {
    try {
        const newProduct = new ProductsModule(req.body);
        await newProduct.save();
        res.status(200).json(true);
    } catch (error) {
        res.status(500).json(false);
    }
}

export default products_addProduct;
