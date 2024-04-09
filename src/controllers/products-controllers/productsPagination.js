import { productDataTypes } from "../../CONSTANT/projections.js";
import createProjection from "../../utilities/createProjection.js";
import ProductsModel from "../../models/Products.js";


export default async function productsPagination(query) {
    const { page = 1, pageSize = 10, returnType, type, categories } = query;
    const skip = (page - 1) * pageSize;
    const projection = returnType ? createProjection(returnType) : productDataTypes[type ?? "basic"];
    try {
        const categoriesFilter = createCategoriesFilter(categories);
        const products = await ProductsModel.find(
            categoriesFilter ? { $or: categoriesFilter } : {},
            projection,
            { limit: +pageSize + 1, skip }
        );
        const thereIsNextPage = !!products[pageSize];
        return {
            products: products.slice(0, thereIsNextPage ? -1 : undefined),
            thereIsNextPage
        }
    } catch {
        return null
    }
}

function createCategoriesFilter(categories) {
    if (categories) {
        return categories.split(",").map((category) => ({ category }))
    }
    return null
}