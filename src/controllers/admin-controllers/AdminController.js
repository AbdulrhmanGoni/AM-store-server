import addProduct from "./addProduct.js"
import deleteProducts from "./deleteProducts.js"
import updateProduct from "./updateProduct.js"

class AdminController {
    constructor() { }
}

export default Object.assign(AdminController.prototype, {
    addProduct,
    updateProduct,
    deleteProducts
})