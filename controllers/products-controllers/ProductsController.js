import getProductById from "./getProductById.js"
import search from "./search.js"
import searchByIds from "./searchByIds.js"
import productsPagination from "./productsPagination.js"
import getSortedProducts from "./getSortedProducts.js"
import productsInStock from "./productsInStock.js"
import productsCount from "./productsCount.js"


class ProductsController {
    constructor() { }
}

export default Object.assign(ProductsController.prototype, {
    getProductById,
    search,
    searchByIds,
    productsPagination,
    getSortedProducts,
    productsCount,
    productsInStock
})

