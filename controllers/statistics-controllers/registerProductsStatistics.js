import ProductsModel from "../../models/Products.js";
import idHandler from "../../functions/idHandler.js";
import registerCategoriesStatistics from "./registerCategoriesStatistics.js";


export default async function registerProductsStatistics(products, currentYearStatistics, session) {
    try {
        let categories = {};

        for (let i = 0; i < products.length; i++) {
            const { count, category, price, id: _id } = idHandler(products[i]);
            const earnings = price * count;

            if (!categories[category]) {
                categories[category] = { earnings, productsCount: count };
            } else {
                categories[category].earnings += earnings;
                categories[category].productsCount += count;
            }

            await ProductsModel.updateOne({ _id }, { $inc: { amount: -count, sold: count, earnings } }, { session });
        }

        return registerCategoriesStatistics(categories, currentYearStatistics);
    } catch (error) {
        console.log(error)
        return false
    }
}