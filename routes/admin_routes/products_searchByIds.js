import { productDataTypes } from "../../CONSTANT/projections";
import ProductsController from "../../controllers/products-controllers/ProductsController";
import createProjection from "../../functions/createProjection";

export default async function products_searchByIds(req, res) {
    const { productsIds, withCount, withPrice } = req.body;
    const { type, custom } = req.query;
    const projection = custom ? createProjection(custom) : productDataTypes[type ?? "basic"];
    try {
        const response = await ProductsController.searchByIds(productsIds, projection, { withCount, withPrice });
        res.status(200).json(response);
    } catch {
        res.status(400).json(null);
    }
}
