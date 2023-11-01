import { model, Schema } from "mongoose";
import { MONTHES } from "../CONSTANT/MONTHES.js";

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
    monthes: {
        type: [
            {
                month: String,
                totalEarnings: Number,
                productsSold: Number,
                totalOrders: Number,
                earningsTarget: Number
            }
        ],
        default: MONTHES.map((month) => {
            return {
                month,
                totalEarnings: 0,
                productsSold: 0,
                totalOrders: 0,
                earningsTarget: 0
            }
        })
    }
})

const YearlyStatisticsModel = model("yearly-statistics", YearlyStatisticsSchema)
export default YearlyStatisticsModel;
