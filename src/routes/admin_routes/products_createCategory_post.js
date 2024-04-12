import { startSession } from "mongoose";
import updateRedisCache from "../../cache/updateRedisCache.js";
import AdminController from "../../controllers/admin-controllers/AdminController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import ErrorGenerator from "../../utilities/ErrorGenerator.js";

export default asyncRouteHandler(
    async function products_createCategory_post(req, res, next) {
        const { category } = req.query;
        if (category) {
            const session = await startSession();
            session.startTransaction();
            const dbUpdateResponse = await AdminController.createCategory(category, session);
            if (dbUpdateResponse === null) {
                return next(new ErrorGenerator("The category already exist", 400));
            }
            const cacheUpdateResponse = await updateRedisCache("store-variables", (variablesObject) => {
                variablesObject?.productsCategories.push(category)
                return variablesObject
            })
            if (dbUpdateResponse && cacheUpdateResponse) {
                await session.commitTransaction();
                res.status(200).json(true);
            } else {
                await session.abortTransaction();
                res.status(400).json(false);
            }
        } else {
            next(new ErrorGenerator("Ivalid Category Name", 400));
        }
    }
)