import moment from "moment/moment.js";

export default function getCurrentDate() {
    return {
        year: new Date().getFullYear(),
        month: moment().format("MMM")
    }
}
