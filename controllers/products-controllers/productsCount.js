import ProductsModel from '../../models/Products.js'

export default async function productsCount() {
    try { return (await ProductsModel.count()) }
    catch { return null }
}
