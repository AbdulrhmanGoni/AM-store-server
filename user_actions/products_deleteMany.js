import ProductsModule from "../models/Products.js";

const products_deleteMany = async (req, res) => {
    const { productsIds } = req.body;
    try {
        const respond = await ProductsModule.deleteMany({ _id: { $in: productsIds } });
        res.status(200).json(respond);
    } catch { res.status(400).json(null) }
}

export default products_deleteMany;