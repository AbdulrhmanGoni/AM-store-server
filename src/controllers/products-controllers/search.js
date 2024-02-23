import ProductsModel from "../../models/Products.js";

export default async function search({ queries, projection }) {
    try {
        const
            { category, title, series, limit = 8, page } = queries,
            matchAll = new RegExp(/.*/, "i"),
            titleReg = new RegExp(title, "i"),
            seriesReg = new RegExp(series, "i");

        const filter = {
            category: category ?? matchAll,
            title: titleReg,
            series: seriesReg
        }

        if (!isNaN(+page)) {
            const skip = (+page - 1) * +limit;
            const products = await ProductsModel.find(filter, projection, { limit: +limit + 1, skip });
            return {
                products: products.slice(0, +limit),
                thereIsMore: !!products[limit]
            }
        } else {
            return await ProductsModel.find(filter, projection, { limit });
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}
