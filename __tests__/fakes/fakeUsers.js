import { readFileSync } from "fs";

const path = "./__tests__/fakes/fakeUsers.json"
export const fakeUsers = JSON.parse(readFileSync(path, { encoding: "utf8" }))

export const fakeUser = fakeUsers[0]

export const fakeAdmin = {
    adminName: "Abdulrhman Goni",
    adminEmail: "am.store.goni@gmail.com",
    adminPassword: "$8b$91$.VqwlLPuoihz0tadwqs3TelanE9BO6N/SESOlVtM/ryj57m8cg4q7",
    avatar: "https://live.staticflickr.com/65535/52744827196_63e59d27af.jpg"
}
