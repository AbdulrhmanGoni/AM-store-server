import databaseConnections from "./databaseConnections.js";
import { redisClientConnection } from "./redisClient.js";
import { initializeYearlyStatisticsCollection } from "../models/YearlyStatistics.js";
import { initializeSettingsCollection } from "../models/Settings.js";

export default async function initializations() {
    return Promise.all([
        databaseConnections(),
        redisClientConnection(),
        initializeSettingsCollection(),
        initializeYearlyStatisticsCollection(),
    ])
}
