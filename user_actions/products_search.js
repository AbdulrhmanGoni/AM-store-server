import { productDataTypes } from "../CONSTANT/dataTypes.js";
import createProjection from "../functions/createProjection.js";
import ProductsModule from "../models/Products.js";

const products_search = async (req, res) => {
    const { category, title, series, type, limit } = req.query;
    const matchAll = new RegExp(/.*/, "i");
    const titleReg = new RegExp(title, "i");
    const seriesReg = new RegExp(series, "i");
    try {
        const products = await ProductsModule.find({
            category: category ?? matchAll,
            title: titleReg,
            series: seriesReg
        }, productDataTypes[type ?? "basic"], { limit });
        res.status(200).json(products);
    } catch {
        res.status(400).json([]);
    }
}

export default products_search;