import { model, Schema } from "mongoose";

const YearlyStatisticsSchema = new Schema({
    date: { type: String },
    statisticType: { type: String }

})

const YearlyStatisticsModel = model("yearly-statistics", YearlyStatisticsSchema)
export default YearlyStatisticsModel;
