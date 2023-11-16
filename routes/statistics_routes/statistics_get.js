import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js"

const statisticsControllerKeys = {
    "monthly-sales-statistics": {
        name: "monthlySalesStatistics",
        params: ["year"]
    },
    "monthly-categories-statistics": {
        name: "monthlyCategoriesStatistics",
        params: ["year"]
    },
    "categories-statistics": {
        name: "categoriesStatistics",
        params: []
    },
    "products-statistics": {
        name: "productsStatistics",
        params: []
    },
    "top-products": {
        name: "topProducts",
        params: ["limit"]
    },
    "top-serieses": {
        name: "mostPopularSerieses",
        params: ["limit"]
    },
    "users-statistics": {
        name: "usersStatistics",
        params: []
    },
    "top-customers": {
        name: "topCustomers",
        params: ["linit"]
    },
    "orders-statistics": {
        name: "ordersStatistics",
        params: ["year"]
    },
    "orders-get-latest": {
        name: "getLatestOrders",
        params: ["limit"]
    },
    "users-overview": {
        name: "usersOverview",
        params: ["page", "limit"]
    }
}

export default async function statistics_get(req, res) {
    try {
        const { get } = req.query;
        if (get) {
            const statistic = statisticsControllerKeys[get]
            const statisticQuery = StatisticsController[statistic.name];
            if (statistic && statisticQuery) {
                const response = await statisticQuery(...statistic.params.map((param) => req.query[param]));
                response && res.status(200).json(response);
                !response && res.status(400).json();
            }
            else res.status(400).json({ message: "unknown query" })
        }
        else { res.status(400).json({ message: "you have to specify query" }) }
    } catch (error) {
        console.log(error)
        res.status(400).json()
    }
}
