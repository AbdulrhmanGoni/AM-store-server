import statistics_monthlySalesStatistics_get from "./statistics_monthlySalesStatistics_get.js";
import statistics_monthlyCategoriesStatistics_get from "./statistics_monthlyCategoriesStatistics_get.js";
import statistics_categories_get from "./statistics_categories_get.js";
import statistics_products_get from "./statistics_products_get.js";
import statistics_salesGrowth_get from "./statistics_salesGrowth_get.js";
import statistics_topProducts_get from "./statistics_topProducts_get.js";
import statistics_topSerieses_get from "./statistics_topSerieses_get.js";
import statistics_users_get from "./statistics_users_get.js";
import statistics_topCustomers_get from "./statistics_topCustomers_get.js";
import statistics_orders_get from "./statistics_orders_get.js";
import statistics_usersOverview_get from "./statistics_usersOverview_get.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

const handlers = {
    "monthly-sales-statistics": statistics_monthlySalesStatistics_get,
    "monthly-categories-statistics": statistics_monthlyCategoriesStatistics_get,
    "categories-statistics": statistics_categories_get,
    "products-statistics": statistics_products_get,
    "sales-growth": statistics_salesGrowth_get,
    "top-products": statistics_topProducts_get,
    "top-serieses": statistics_topSerieses_get,
    "users-statistics": statistics_users_get,
    "top-customers": statistics_topCustomers_get,
    "orders-statistics": statistics_orders_get,
    "users-overview": statistics_usersOverview_get
}

export default asyncRouteHandler(
    async function statistics_get(req, res) {
        const { queryKey } = req.query;
        if (queryKey) {
            if (handlers[queryKey]) handlers[queryKey](req, res)
            else return res.status(400).json({ message: "unknown query queryKey" });
        } else {
            res.status(400).json({ message: "you have to specify query queryKey" })
        }
    }
)