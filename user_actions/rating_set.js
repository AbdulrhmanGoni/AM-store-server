import ProductsModule from "../models/Products.js";

async function rating_set(req, res) {
    console.log(req.body);
    try {
        await ProductsModule.updateOne({ _id: req.params.productId }, { $push: { "rate.raters": req.body } })
        res.status(200).json(true);
    } catch (error) {
        res.status(400).json(null);
    }
}

export default rating_set;