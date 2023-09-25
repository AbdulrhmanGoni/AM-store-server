import ProductsModel from "../models/Products.js";
import idHandler from "../functions/idHandler.js";
import YearlyStatisticsModel from "../models/YearlyStatistics.js";
import getCurrentDate from "../functions/getCurrentDate.js";

export default async function products_setStatistics(products, session) {
    const
        { year, month } = getCurrentDate(),
        createFliter = (category) => {
            return {
                year,
                statisticsType: "products-categories",
                [`categories.${category}.month`]: month
            }
        },
        createUpdate = (category, productsCount, totalPrice) => {
            return {
                $inc: {
                    [`categories.${category}.$.productsSold`]: productsCount,
                    [`categories.${category}.$.totalEarnings`]: totalPrice,
                }
            }
        }

    let
        categories = {},
        response = true;
    for (let i = 0; i < products.length; i++) {
        try {
            const { count, category, price, id: _id } = idHandler(products[i]);
            const earnings = price * count;
            if (categories[category]) {
                categories[category].earnings += earnings
                categories[category].count += count
            } else {
                Object.defineProperty(categories, category, { value: { earnings, count }, enumerable: true })
            }
            await ProductsModel.updateOne({ _id }, { $inc: { amount: -count, sold: count, earnings } }, { session });
        } catch (error) {
            console.log(error, _id, "(fieled to update its data)")
            response = false
        }
    }

    for (const cat in categories) {
        try {
            if (!!categories[cat]) {
                const { count, earnings } = categories[cat];
                await YearlyStatisticsModel.updateOne(
                    createFliter(cat),
                    createUpdate(cat, count, earnings),
                    {session}
                );
            }
        } catch (error) {
            console.log(error, _id, "(fieled to set its statistics)")
            response = false
        }
    }
    return response;
}