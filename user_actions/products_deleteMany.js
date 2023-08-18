import ProductsModule from "../models/Products.js";

const products_deleteMany = async (req, res) => {
    const { productsIds } = req.body;
    try {
        // const { deletedCount } = await ProductsModule.deleteMany({ _id: { $in: productsIds } });
        // res.status(200).json(deletedCount > 0);
        res.status(200).json(true);
    } catch { res.status(400).json(null) }
}

export default products_deleteMany;