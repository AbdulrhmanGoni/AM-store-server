import { productDataTypes } from "../../CONSTANT/projections.js";
import cacheOrQuery from "../../cache/cacheOrQuery.js";
import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import genTime from "../../utilities/genTime.js";


export default asyncRouteHandler(
    async function products_userSearch_get(req, res) {
        const { query: { cacheFor, type }, url } = req
        const searchOptions = {
            queries: req.query,
            projection: productDataTypes[type ?? "basic"]
        }
        let response;
        if (cacheFor) {
            const expirationDate = genTime(...cacheFor?.split("-")?.reverse())
            response = await cacheOrQuery(url, ProductsController.search(searchOptions), expirationDate / 1000)
        } else {
            response = await ProductsController.search(searchOptions);
        }
        res.status(response ? 200 : 400).json(response);
    }
)