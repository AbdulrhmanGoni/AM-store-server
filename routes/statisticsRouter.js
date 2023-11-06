import { Router } from "express";
import monthlySalesStatistics from "../system_actions/monthlySalesStatistics.js";
import products_topProducts from "../system_actions/products_topProducts.js";
import orders_getLatest from "../system_actions/orders_getLatest.js";
import mostPopularSerieses from "../system_actions/mostPopularSerieses.js";
import users_overview from "../system_actions/users_overview.js";
import monthlyCategoriesStatistics from "../system_actions/monthlyCategoriesStatistics.js";
import categoriesStatistics from "../system_actions/categoriesStatistics.js";
import topCustomers from "../system_actions/topCustomers.js";
import users_statistics from "../system_actions/users_statistics.js";

const router = Router();

const statisticsQueriesControler = {
    "monthly-sales-statistics": monthlySalesStatistics,
    "monthly-categories-statistics": monthlyCategoriesStatistics,
    "categories-statistics": categoriesStatistics,
    "top-products": products_topProducts,
    "orders-get-latest": orders_getLatest,
    "top-serieses": mostPopularSerieses,
    "users-overview": users_overview,
    "users-statistics": users_statistics,
    "top-customers": topCustomers
}

router.get("/", async (req, res) => {
    let { get } = req.query;
    const query = statisticsQueriesControler[get];
    if (query) { query(req, res) }
    else if (get) { res.status(400).json({ message: "unknown query" }) }
    else { res.status(400).json({ message: "you have to specify query" }) }
});

export default router;