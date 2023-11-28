import AdminController from "../../controllers/admin-controllers/AdminController.js";

export default async function products_post(req, res) {

    const { updateProductsField, addProduct } = AdminController;

    try {
        switch (req.query.type) {
            case "add-new-product": {
                const response = await addProduct(req.body);
                res.status(response? 200 : 400).json(response);
                break;
            }
            case "update-filed": {
                const response = await updateProductsField(req.body.productId, req.body.change);
                res.status(response? 200 : 400).json(response);
                break;
            }
            default: res.status(400).json(null); break;
        }
    } catch (error) {
        console.log(error)
    }
}