import crypto from "crypto"

export const fakeLocations = [
    {
        theName: "Abdulrhman Mohammed",
        phone: "0503219567",
        country: "Saudi Arabia",
        city: "macca",
        street: "Mansor Street",
        moreDetails: "Behind Abo Mohamed Resturent",
        type: "Home",
        id: crypto.randomUUID()
    },
    {
        theName: "Yasashi Dhme",
        phone: "96523459973",
        country: "Japan",
        city: "Osaka",
        street: "Pouar Street",
        moreDetails: "Behind Detective Conan Store",
        type: "Home",
        id: crypto.randomUUID()
    }
]

export function getRandomLocation() {
    return fakeLocations[Math.floor(Math.random() * fakeLocations.length)]
}