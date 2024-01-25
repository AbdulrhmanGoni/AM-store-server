import { generateJWT } from "../../src/utilities/jwtUtilities.js";

const userAccessToken = generateJWT({
    userId: "6442ea0558a819df70390175",
    role: "user"
})

const adminAccessToken = generateJWT({
    adminId: "64e0f875c2d61623ef30c3a2",
    role: "admin"
})

export {
    userAccessToken,
    adminAccessToken
}