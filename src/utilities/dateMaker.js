import { MONTHES } from "../CONSTANT/MONTHES.js";

export function getCurrentDate() {
    return {
        year: new Date().getFullYear(),
        month: MONTHES[new Date().getMonth()],
        monthIndex: new Date().getMonth()
    }
}

export function getDateAfterN(days = 0) {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + days);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = nextDate.toLocaleDateString("en-US", options);
    return formattedDate;
}
