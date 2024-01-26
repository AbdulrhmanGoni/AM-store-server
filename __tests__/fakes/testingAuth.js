import { generateJWT } from "../../src/utilities/jwtUtilities.js";

const userId = "64440dec163292936d0f94a7"
const adminId = "64e0f875c2d61623ef30c3a2"

function adminAuth(id = adminId) {
    return { authorization: `Bearer ${generateJWT({ adminId: id, role: "admin" })}` }
}

function userAuth(id = userId) {
    return { authorization: `Bearer ${generateJWT({ userId: id, role: "user" })}` }
}
export {
    adminAuth,
    userId,
    userAuth,
    adminId
}