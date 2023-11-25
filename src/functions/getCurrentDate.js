import { MONTHES } from "../CONSTANT/MONTHES.js";

export default function getCurrentDate() {
    return {
        year: new Date().getFullYear(),
        month: MONTHES[new Date().getMonth()],
        monthIndex: new Date().getMonth()
    }
}
