import products_addProduct from "./products_addProduct.js";
import products_updateProduct from "./products_updateProduct.js";

async function products_set(req, res) {

    switch (req.query.type) {
        case "add-new-product":
            products_addProduct(req, res);
            break;

        case "update-product":
            products_updateProduct(req, res);
            break;

        default:
            res.status(400).json(null);
            break;
    }
}

export default products_set;
