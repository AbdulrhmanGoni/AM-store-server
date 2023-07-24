import moment from "moment/moment.js";

export default function getCurrentDate() {
    return `${new Date().getFullYear()}/${moment().format("MMM")}`;
}
