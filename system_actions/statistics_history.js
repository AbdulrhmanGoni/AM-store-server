import StatisticsHistory from "../models/StatisticsHistory.js";
import { MONTHES } from "../CONSTANT/MONTHES.js";
import createProjection from "../functions/createProjection.js";

async function statistics_history(req, res) {
    const targetYear = req.query.targetYear ?? new Date().getFullYear();
    const yearRange = { date: new RegExp(`${targetYear}/\\w{3}`) };
    const returnType = createProjection(req.query.return, { withId: false });
    const emptyDoc = createProjection(req.query.return, { withId: null, customValue: 0, except: ["date"] });
    try {
        const statistics = await StatisticsHistory.find(yearRange, returnType);
        res.status(200).json(MONTHES.map((month) => {
            return statistics.find(doc => doc.date.match(new RegExp(`\\/${month}`)))
                ?? { date: `${targetYear}/${month}`, ...emptyDoc }
        }));
    } catch (error) {
        console.log(error);
        res.status(401).json(null);
    }
}

export default statistics_history;
