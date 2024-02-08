import { readFileSync } from "fs";

const path = "./__tests__/fakes/fakeYearlyStatistics.json"
const fakeStatistics = JSON.parse(readFileSync(path, { encoding: "utf8" }))

export function getFakeYearStatistics(year) {
    return { ...fakeStatistics, year }
}
