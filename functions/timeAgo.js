export default (theTime) => {
    const allDate = new Date().getTime();
    const startDate = new Date(`${theTime}`).getTime();
    let time = allDate - startDate;

    const formatTime = (num, type) => {
        const time = Math.floor(num);
        let s = time === 1 ? "" : "s";
        return `${time} ${type}${s} ago`;
    }

    const seconds = time / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const week = days / 7;
    const months = days / 28;
    const years = months / 12;

    if (seconds <= 60) {
        return "Just now";
    }
    else if (minutes <= 60) {
        return formatTime(minutes, "minute");
    }
    else if (hours <= 24) {
        return formatTime(hours, "hour");
    }
    else if (days <= 14) {
        return formatTime(days, "day");
    }
    else if (week <= 4) {
        return formatTime(week, "week");
    }
    else if (months <= 12) {
        return formatTime(months, "month");
    }
    else {
        return formatTime(years, "year");
    }
}