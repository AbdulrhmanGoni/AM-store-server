import ProductsModel from "../../models/Products";


export default async function productsPagination(query) {
    const { page = 1, pageSize = 10, returnType, type } = query;
    const skip = (page - 1) * pageSize;
    const projection = returnType ? createProjection(returnType) : productDataTypes[type ?? "basic"];
    try {
        const products = await ProductsModel.find({}, projection, { limit: +pageSize + 1, skip });
        const thereIsNextPage = !!products[pageSize];
        return products.slice(0, thereIsNextPage ? -1 : undefined)
    } catch {
        return []
    }
}
