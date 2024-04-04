import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import { getCurrentDate } from "../../utilities/dateMaker.js";
import ErrorGenerator from "../../utilities/ErrorGenerator.js";

export default asyncRouteHandler(
    async function statistics_setMonthTarget_get(req, res, next) {
        const { year, monthIndex, newTarget } = req.body;
        const currentDate = getCurrentDate();
        if (!isNaN(+year) && !isNaN(+monthIndex)) {
            // if the given month is future or current month
            if (currentDate.year <= +year && (currentDate.monthIndex <= +monthIndex || currentDate.year < +year)) {
                if (!isNaN(+newTarget)) {
                    const response = await StatisticsController.setMonthTarget({ year, monthIndex, newTarget });
                    res.status(response === undefined ? 400 : 200).json(response);
                } else {
                    next(new ErrorGenerator("Invalid Target", 400));
                }
            } else {
                next(new ErrorGenerator("Can't set a target for a passed month", 400));
            }
        } else {
            next(new ErrorGenerator("Invalid Date", 400));
        }
    }
)
