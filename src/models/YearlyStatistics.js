import { model, Schema } from "mongoose";
import { MONTHES } from "../CONSTANT/MONTHES.js";
import { ANumber, RequiredNumber, RequiredString } from "../utilities/schemaTypesOptions.js";

const MonthStatistics = new Schema({
    month: RequiredString(),
    totalEarnings: ANumber(),
    productsSold: ANumber(),
    totalOrders: ANumber(),
    earningsTarget: ANumber(),
    _id: false
})

const YearlyStatisticsSchema = new Schema(
    {
        year: RequiredNumber({ unique: true, min: 2023 }),
        categories: {
            type: [
                {
                    category: String,
                    monthlyStatistics: [{
                        month: RequiredString(),
                        totalEarnings: ANumber(),
                        productsSold: ANumber(),
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
    },
    { versionKey: false }
)

const YearlyStatisticsModel = model("yearly-statistics", YearlyStatisticsSchema);

export default YearlyStatisticsModel;
