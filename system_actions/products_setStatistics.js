import ProductsStatisticsModel from "../models/ProductsStatistics.js";
import ProductsModel from "../models/Products.js";
import idHandler from "../functions/idHandler.js";
import getCurrentDate from "../functions/getCurrentDate.js";

async function products_setStatistics(products) {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        let
            productId = idHandler(product).id,
            productCount = idHandler(product).count,
            productCategory = idHandler(product).category,
            productPrice = idHandler(product).price * productCount

        try {
            await ProductsModel.updateOne({ _id: productId },
                { $inc: { amount: -productCount, sold: productCount, earnings: productPrice } }
            );
        } catch (error) { console.log(productId, "(fieled to update its data)") }
        try {
            const currentDoc = await ProductsStatisticsModel.findOneAndUpdate(
                { category: productCategory, date: getCurrentDate() },
                { $inc: { productsSold: productCount, totalEarnings: productPrice } }
            );
            if (!currentDoc) {
                const newDoc = new ProductsStatisticsModel({
                    date: getCurrentDate(),
                    category: productCategory,
                    productsSold: productCount,
                    totalEarnings: productPrice
                });
                await newDoc.save();
            }
        } catch (error) { console.log(productId, "(fieled to include its statistics)") }
    }
}

export default products_setStatistics;