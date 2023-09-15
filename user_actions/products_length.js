import ProductsModule from "../models/Products.js";

const products_length = async (_, res) => {
    try { res.status(200).json((await ProductsModule.count())) }
    catch { res.status(400).json(null) }
}

export default products_length;