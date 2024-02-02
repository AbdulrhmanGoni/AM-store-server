import getProductsCategoriesList from "../../controllers/settings-controllers/getProductsCategoriesList.js";
import ErrorGenerator from "../../utilities/ErrorGenerator.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function productsCategorieslist_get(_req, res, next) {
        const categoriesList = await getProductsCategoriesList();
        if (categoriesList) {
            res.status(200).json({ categoriesList })
        } else {
            next(new ErrorGenerator("Failed for get categories list"))
        }
    }
)