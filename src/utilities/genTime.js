/**
* Generates a time in milliseconds based on the given time type and count.
* 
* @param { "seconds" | "minutes" | "hours" | "days" | "weeks" | "monthes" } timeType - The type of time to generate
* @param { number } count - The count of the time type ( seconds or minutes or hours or days or weeks or monthes ).
* 
* @return { number } The time in milliseconds for the given time type, or 0 if the given time type unknewn
*
* @example 
* // Example usage:
* let time = genTime("hours", 3); // generate 3 hours by milliseconds.
* console.log(time); // Output: 10800000
*/
export default function genTime(timeType, count) {

    const
        milliseconds = 1000,
        seconds = 1 * milliseconds,
        minutes = seconds * 60,
        hours = minutes * 60,
        days = hours * 24,
        weeks = days * 7,
        monthes = days * 30

    switch (timeType) {
        case "seconds": return seconds * count;
        case "minutes": return minutes * count;
        case "hours": return hours * count;
        case "days": return days * count;
        case "weeks": return weeks * count;
        case "monthes": return monthes * count;
        default: return 0;
    }
}