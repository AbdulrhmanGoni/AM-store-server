
export const fakePaymentMethods = [
    {
        theName: "Abdulrhman Mohammed",
        number: 789876543341,
        expired: new Date("2025-6-01").toISOString()
    },
    {
        theName: "King Dhme",
        number: 354113996544,
        expired: new Date("2025-1-01").toISOString()
    }
]

export function getRandomPaymentMethods() {
    return fakePaymentMethods[Math.floor(Math.random() * fakePaymentMethods.length)]
}