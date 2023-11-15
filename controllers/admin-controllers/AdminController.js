import addProduct from "./addProduct.js"
import deleteProducts from "./deleteProducts.js"
import updateProduct from "./updateProduct.js"
import updateProductsField from "./updateProductsField.js"
import searchForProducts from "./searchForProducts.js"
import searchForUsers from "./searchForUsers.js"

class AdminController {
    constructor() { }
}

export default Object.assign(AdminController.prototype, {
    addProduct,
    updateProduct,
    deleteProducts,
    updateProductsField,
    searchForUsers,
    searchForProducts,
})