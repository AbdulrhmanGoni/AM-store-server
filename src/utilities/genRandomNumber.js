export default function genRandomNumber(digits) {
    const min = +(`1${"0".repeat(digits - 1)}`)
    const max = +("9".repeat(digits));
    return Math.floor(Math.random() * (max - min)) + min;
}