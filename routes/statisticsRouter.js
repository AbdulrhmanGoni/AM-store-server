import { Router } from "express";

import statistics_history from "../system_actions/statistics_history.js";
import categories_earnings from "../system_actions/categories_earnings.js";
import products_topSales from "../system_actions/products_topSales.js";
import products_topEarnings from "../system_actions/products_topEarnings.js";
import orders_getLatest from "../system_actions/orders_getLatest.js";

const router = Router();

router.get("/", async (req, res) => {

    switch (req.query.get) {
        case "categories-earnings":
            categories_earnings(req, res);
            break;

        case "statistics-history":
            statistics_history(req, res);
            break;

        case "products-top-sales":
            products_topSales(req, res);
            break;

        case "products-top-earnings":
            products_topEarnings(req, res);
            break;

        case "orders-get-latest":
            orders_getLatest(req, res);
            break;

        default:
            res.status(400).json({ message: "you have to specify query" })
            break;
    }

});

export default router