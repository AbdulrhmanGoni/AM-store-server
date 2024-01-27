
export const fakePaymentMethods = [
    {
        theName: "Abdulrhman Mohammed",
        number: 789876543341,
        expired: new Date("2025-6-01")
    },
    {
        theName: "King Dhme",
        number: 354113996544,
        expired: new Date("2025-1-01")
    }
]

export function getRandomPaymentMethods() {
    return fakePaymentMethods[Math.floor(Math.random() * fakePaymentMethods.length)]
}