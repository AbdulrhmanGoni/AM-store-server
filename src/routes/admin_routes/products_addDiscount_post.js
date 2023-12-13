import AdminController from "../../controllers/admin-controllers/AdminController.js";


export default async function products_addDiscount_post(req, res) {
    try {
        const { productsIds, discount } = req;
        const response = await AdminController.addDiscountToProducts(productsIds, discount);
        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        res.status(400).json(null);
    }
}
