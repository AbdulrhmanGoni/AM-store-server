import AdminController from "../../controllers/admin-contrillers/AdminController.js";

export default async function product_post(req, res) {
    try {
        const respond = await AdminController.updateProduct(req.params.productId, req.body.changes);
        res.status(200).json(respond);
    } catch (error) {
        res.status(400).json(null);
    }
}