import favorites_setCart from "./favorites_setCart.js";
import favorites_toggle from "./favorites_toggle.js";

const favorites_set = async (req, res) => {
    const { type } = req.body;
    switch (type) {
        case "toggle":
            favorites_toggle(req, res);
            break;

        case "setNewFavorites":
            favorites_setCart(req, res);
            break;

        default:
            res.status(400).json(null);
            break;
    }
}

export default favorites_set;