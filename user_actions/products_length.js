import ProductsModule from "../models/Products.js";

const products_length = async (_, res) => {
    try { res.status(200).json((await ProductsModule.find({}, { _id: true })).length) }
    catch { res.status(400).json([]) }
}

export default products_length;