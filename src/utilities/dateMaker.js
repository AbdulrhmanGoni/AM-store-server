import { MONTHES } from "../CONSTANT/MONTHES.js";
import getTheDateAfterNDays from "./getTheDateAfterNDays.js";

export function getCurrentDate() {
    return {
        year: new Date().getFullYear(),
        month: MONTHES[new Date().getMonth()],
        monthIndex: new Date().getMonth()
    }
}

export function getDateAfterN(days = 1) {
    const nextDate = getTheDateAfterNDays(days)
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = nextDate.toLocaleDateString("en-US", options);
    return formattedDate;
}
