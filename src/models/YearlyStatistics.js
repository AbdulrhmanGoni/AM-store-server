import { model, Schema } from "mongoose";
import { MONTHES } from "../CONSTANT/MONTHES.js";

const MonthStatistics = new Schema({
    month: {
        type: String,
        required: true
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    productsSold: {
        type: Number,
        default: 0
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    earningsTarget: {
        type: Number,
        default: 0
    },
    _id: false
})

const YearlyStatisticsSchema = new Schema({
    year: {
        type: Number,
        required: true,
        unique: true,
        min: 2023
    },
    categories: {
        type: [
            {
                category: String,
                monthlyStatistics: [{
                    month: {
                        type: String,
                        required: true
                    },
                    totalEarnings: {
                        type: Number,
                        default: 0
                    },
                    productsSold: {
                        type: Number,
                        default: 0
                    },
                    _id: false
                }],
                _id: false
            }
        ],
        default: []
    },
    monthes: {
        type: [MonthStatistics],
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

const YearlyStatisticsModel = model("yearly-statistics", YearlyStatisticsSchema);

export default YearlyStatisticsModel;
