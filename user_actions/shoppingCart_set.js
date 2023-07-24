import shoppingCart_addProduct from "./shoppingCart_addProduct.js";
import shoppingCart_setCart from "./shoppingCart_setCart.js";

const shoppingCart_set = async (req, res) => {
    switch (req.body.type) {
        case "add_Item":
            shoppingCart_addProduct(req, res);
            break;

        case "set_new_cart":
            shoppingCart_setCart(req, res);
            break;

        default:
            res.status(400).json({ error: type + "is invalid type, use 'add_Item' or 'set_new_cart'" });
            break;
    }
}


export default shoppingCart_set;