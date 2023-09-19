import { Router } from "express";
import monthly_statistics from "../system_actions/monthly_statistics.js";
import categories_statistics from "../system_actions/categories_statistics.js";
import products_topProducts from "../system_actions/products_topProducts.js";
import orders_getLatest from "../system_actions/orders_getLatest.js";
import mostPopularSerieses from "../system_actions/mostPopularSerieses.js";

const router = Router();

const statisticsQueriesControler = {
    "categories-statistics": categories_statistics,
    "monthly-statistics": monthly_statistics,
    "top-products": products_topProducts,
    "orders-get-latest": orders_getLatest,
    "top-serieses": mostPopularSerieses,
    // "total-products-sold": totalProductsSold,
    // "products-totals": orders_getLatest
}

router.get("/", async (req, res) => {
    let { get } = req.query;
    const query = statisticsQueriesControler[get];
    if (!!query) { query(req, res) }
    else if (get) { res.status(400).json({ message: "you specify unknown query" }) }
    else { res.status(400).json({ message: "you have to specify query" }) }
});

export default router;