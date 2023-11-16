import AdminController from "../../controllers/admin-controllers/AdminController.js";


export default async function products_delete(req, res) {
    try {
        const { productsIds = [] } = req.body;
        const respond = await AdminController.deleteProducts([req.params.productId, ...productsIds]);
        res.status(200).json(respond);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}
