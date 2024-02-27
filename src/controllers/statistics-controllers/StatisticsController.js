import categoriesStatistics from "./categoriesStatistics.js"
import getYearStatisticsDocument from "./getYearStatisticsDocument.js"
import monthlyCategoriesStatistics from "./monthlyCategoriesStatistics.js"
import monthlySalesStatistics from "./monthlySalesStatistics.js"
import salesGrowth from "./salesGrowth.js"
import mostPopularSeries from "./mostPopularSeries.js"
import ordersStatistics from "./ordersStatistics.js"
import productsStatistics from "./productsStatistics.js"
import topProducts from "./topProducts.js"
import topCustomers from "./topCustomers.js"
import getLatestOrders from "../orders-controllers/getLatestOrders.js"
import usersOverview from "../users-controllers/usersOverview.js"
import usersStatistics from "./usersStatistics.js"
import registerOrderStatistics from "./registerOrderStatistics.js"
import registerCategoriesStatistics from "./registerCategoriesStatistics.js"
import registerProductsStatistics from "./registerProductsStatistics.js"

class StatisticsController {
    constructor() { }
}

export default Object.assign(StatisticsController.prototype, {
    categoriesStatistics,
    getYearStatisticsDocument,
    monthlyCategoriesStatistics,
    monthlySalesStatistics,
    salesGrowth,
    mostPopularSeries,
    ordersStatistics,
    productsStatistics,
    topProducts,
    topCustomers,
    getLatestOrders,
    usersOverview,
    usersStatistics,
    registerOrderStatistics,
    registerCategoriesStatistics,
    registerProductsStatistics,
})
