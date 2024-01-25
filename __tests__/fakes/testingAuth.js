import { generateJWT } from "../../src/utilities/jwtUtilities.js";

const userId = "64440dec163292936d0f94a7"
const adminId = "64e0f875c2d61623ef30c3a2"

const userAccessToken = generateJWT({ userId, role: "user" })

const adminAccessToken = generateJWT({ adminId, role: "admin" })

export {
    userAccessToken,
    userId,
    adminAccessToken,
    adminId
}