import request from "supertest"
import server from "../../src/server.js"
import { adminAuth, userAuth } from "../fakes/testingAuth.js"

/**
 * @param { string } url
 * @param { "get" | "post" | "delete" | "patch" | "put" } method
 * @param { { body: any adminId: string } } options
 */
function adminRequest(url, method, options) {
    return request(server)[method](url)
        .set(adminAuth(options?.adminId))
        .send(options?.body)
}

/**
 * @param { string } url
 * @param { "get" | "post" | "delete" | "patch" | "put" } method
 * @param { { body: any userId: string } } options
 */
function userRequest(url, method, options) {
    return request(server)[method](url)
        .set(userAuth(options?.userId))
        .send(options?.body)
}

/**
 * @param { string } url
 * @param { "get" | "post" | "delete" | "patch" | "put" } method
 * @param { any } body
 */
function anyRequest(url, method, body) {
    return request(server)[method](url).send(body)
}

export {
    userRequest,
    adminRequest,
    anyRequest
}
