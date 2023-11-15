import ProductsModule from "../../models/Products.js";

const products_delete = async (req, res) => {
    const { productId } = req.params;
    try {
        const respond = await ProductsModule.deleteOne({ _id: productId });
        res.status(200).json(respond);
    } catch { res.status(400).json(null) }
}

export default products_delete;