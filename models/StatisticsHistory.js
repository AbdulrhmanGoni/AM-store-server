import { model, Schema } from "mongoose";

const StatisticsHistorySchema = new Schema({
    date: { type: String },
    totalEarnings: { type: Number },
    totalOrders: { type: Number },
    productsSold: { type: Number }
})

const StatisticsHistoryModel = model("statisticshistory", StatisticsHistorySchema);
export default StatisticsHistoryModel;