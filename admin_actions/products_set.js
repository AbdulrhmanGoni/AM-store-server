import products_addProduct from "./products_addProduct.js";
import products_updateField from "./products_updateField.js";

async function products_set(req, res) {

    switch (req.query.type) {
        case "add-new-product": products_addProduct(req, res); break;
        case "update-field": products_updateField(req, res); break;
        default: res.status(400).json(null); break;
    }
}

export default products_set;
