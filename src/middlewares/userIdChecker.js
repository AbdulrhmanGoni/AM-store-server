import asyncRouteHandler from "../utilities/asyncRouteHandler.js";
import ErrorGenerator from "../utilities/ErrorGenerator.js";

export default asyncRouteHandler(
    async function userIdChecker(req, _res, next) {
        if (req.userId === req.params.userId) next()
        else {
            next(new ErrorGenerator("Failed to Authenticate the user", 401))
        }
    }
)