import { model, Schema } from "mongoose";

const YearlyStatisticsSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    statisticsType: {
        type: String,
        required: true
    },
    categories: { type: Object },
    monthes: [
        {
            month: String,
            totalEarnings: Number,
            productsSold: Number,
            totalOrders: Number,
            earningsTarget: Number
        }
    ]
})

const YearlyStatisticsModel = model("yearly-statistics", YearlyStatisticsSchema)
export default YearlyStatisticsModel;
