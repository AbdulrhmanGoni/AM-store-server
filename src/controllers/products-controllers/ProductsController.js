import getProductById from "./getProductById.js"
import search from "./search.js"
import searchByIds from "./searchByIds.js"
import productsPagination from "./productsPagination.js"
import productsCount from "./productsCount.js"
import areUserCanComment from "./areUserCanComment.js"
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
    searchByIds,
    productsPagination,
    productsCount,
    areUserCanComment,
    getProductComments,
    addCommentToProduct,
    likeProductComment,
    disLikeProductComment,
    deleteCommentFromProduct
})