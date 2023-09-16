import { model, Schema } from "mongoose";

const YearlyStatisticsSchema = new Schema({
    date: { type: String },
    statisticsType: { type: String },
    categories: { type: Object },
    monthes: { type: Array },
})

const YearlyStatisticsModel = model("yearly-statistics", YearlyStatisticsSchema)
export default YearlyStatisticsModel;
