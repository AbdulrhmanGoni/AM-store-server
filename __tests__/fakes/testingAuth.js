import { generateJWT } from "../../src/utilities/jwtUtilities.js";

const fakeUserId = "64440dec163292936d0f94a7"
const adminId = "64e0f875c2d61623ef30c3a2"

function adminAuth(id = adminId) {
    return { authorization: `Bearer ${generateJWT({ adminId: id, role: "admin" })}` }
}

function userAuth(id = fakeUserId) {
    return { authorization: `Bearer ${generateJWT({ userId: id, role: "user" })}` }
}
export {
    adminAuth,
    fakeUserId,
    userAuth,
    adminId
}