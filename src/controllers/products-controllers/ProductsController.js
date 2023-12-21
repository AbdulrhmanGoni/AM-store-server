import getProductById from "./getProductById.js"
import search from "./search.js"
import searchByIds from "./searchByIds.js"
import getTopProducts from "./getTopProducts.js"
import productsPagination from "./productsPagination.js"
import productsCount from "./productsCount.js"
import areUserBoughtAProductsBefore from "./areUserBoughtAProductsBefore.js"
import getProductComments from "./getProductComments.js"
import addCommentToProduct from "./addCommentToProduct.js"
import deleteCommentFromProduct from "./deleteCommentFromProduct.js"
import likeProductComment from "./likeProductComment.js"
import disLikeProductComment from "./disLikeProductComment.js"

class ProductsController {
    constructor() { }
}

export default Object.assign(ProductsController.prototype, {
    getProductById,
    search,
    getTopProducts,
    searchByIds,
    productsPagination,
    productsCount,
    areUserBoughtAProductsBefore,
    getProductComments,
    addCommentToProduct,
    likeProductComment,
    disLikeProductComment,
    deleteCommentFromProduct
})