import ProductsModule from "../models/Products.js";

export default async function searchForProducts({ queries, projection }) {
    const { category, title, series, limit } = queries;
    const matchAll = new RegExp(/.*/, "i");
    const titleReg = new RegExp(title, "i");
    const seriesReg = new RegExp(series, "i");
    
    return await ProductsModule.find({
        category: category ?? matchAll,
        title: titleReg,
        series: seriesReg
    }, projection, { limit });
}