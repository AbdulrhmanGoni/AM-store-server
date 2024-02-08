import { readFileSync } from "fs";

const path = "./__tests__/fakes/fakeYearlyStatistics.json"
const fakeStatistics = JSON.parse(readFileSync(path, { encoding: "utf8" }))

export function fakeYearStatistics(year) {
    fakeStatistics.year = year
    return fakeStatistics
}

export default fakeStatistics