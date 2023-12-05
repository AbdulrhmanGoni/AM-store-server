export default function isUserAllowedToChangehisPassword(lastPasswordChange) {
    const currentMonth = new Date().getMonth();
    const lastMonth = new Date(new Date().setMonth(currentMonth - 1)).getTime();
    const lastChange = new Date(lastPasswordChange).getTime();
    return lastMonth > lastChange;
}