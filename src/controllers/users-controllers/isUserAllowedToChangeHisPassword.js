export default function isUserAllowedToChangeHisPassword(lastPasswordChange, allowAfterNSinceLastChange = 1) {
    const currentMonth = new Date().getMonth();
    const lastMonth = new Date(new Date().setMonth(currentMonth - allowAfterNSinceLastChange)).getTime();
    const lastChange = new Date(lastPasswordChange).getTime();
    return lastMonth > lastChange;
}
