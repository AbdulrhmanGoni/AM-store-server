import ProductsModel from "../../models/Products.js";

export default async function search({ queries, projection }) {
    try {
        const
            { category, title, series, limit } = queries,
            matchAll = new RegExp(/.*/, "i"),
            titleReg = new RegExp(title, "i"),
            seriesReg = new RegExp(series, "i");

        const filter = {
            category: category ?? matchAll,
            title: titleReg,
            series: seriesReg
        }

        return await ProductsModel.find(filter, projection, { limit });
    } catch (error) {
        console.log(error)
        return null;
    }
}
