import { MONTHES } from "../CONSTANT/MONTHES.js";
import createProjection from "../functions/createProjection.js";
import ProductsStatisticsModel from "../models/ProductsStatistics.js";
import { CATEGORIES } from "../CONSTANT/PRODUCTS_CATEGORIES.js";

async function getProductsStatistics(req, res) {
    const { targetYear = new Date().getFullYear() } = req.query;
    const yearRange = { date: new RegExp(`${targetYear}/\\w{3}`) };
    const returnType = createProjection(req.query.return, { withId: false });
    try {
        const statistics = await ProductsStatisticsModel.find(yearRange, returnType);
        const categories_statistics = {};
        CATEGORIES.forEach(CAT => {
            categories_statistics[CAT] = MONTHES.map(month => {
                return statistics.find(doc => {
                    return doc.date.match(new RegExp(`/${month}`)) && doc.category === CAT
                })
                    ?? { date: `${targetYear}/${month}`, category: CAT, productsSold: 0, totalEarnings: 0 }
            })
        })
        res.status(200).json(categories_statistics);
    } catch (error) {
        res.status(401).json(null);
    }
}

export default getProductsStatistics;
