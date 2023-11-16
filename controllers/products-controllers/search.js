import ProductsModel from "../../models/Products.js";

export default async function search({ queries, projection }) {
    try {
        const
            { category, title, series, limit } = queries,
            matchAll = new RegExp(/.*/, "i"),
            titleReg = new RegExp(title, "i"),
            seriesReg = new RegExp(series, "i");

        return await ProductsModel.find({
            category: category ?? matchAll,
            title: titleReg,
            series: seriesReg
        }, projection, { limit });
    } catch (error) {
        console.log(error)
        return null;
    }
}
