
export default function getTheDateAfterNDays(days) {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + days);
    return nextDate;
}
