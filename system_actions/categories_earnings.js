import { MONTHES } from "../CONSTANT/MONTHES.js";
import createProjection from "../functions/createProjection.js";
import ProductsStatisticsModel from "../models/ProductsStatistics.js";
import { CATEGORIES } from "../CONSTANT/PRODUCTS_CATEGORIES.js";

async function getProductsStatistics(req, res) {
    const { targetYear = new Date().getFullYear() } = req.query;
    const yearRange = { date: new RegExp(targetYear) };
    const projection = createProjection(req.query.return, { withId: false });
    const emptyDoc = createProjection(req.query.return, { withId: null, customValue: 0 });
    try {
        const statistics = await ProductsStatisticsModel.find(yearRange, projection);
        const categories_statistics = {};
        CATEGORIES.forEach(CAT => {
            categories_statistics[CAT] = MONTHES.map(month => {
                return statistics.find(doc => doc.date.match(new RegExp(month)) && doc.category === CAT)
                    ?? { ...emptyDoc, date: `${targetYear}/${month}`, category: CAT }
            })
        })
        res.status(200).json(categories_statistics);
    } catch (error) {
        res.status(401).json(null);
    }
}

export default getProductsStatistics;
