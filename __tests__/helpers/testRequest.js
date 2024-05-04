import request from "supertest"
import server from "../../src/server.js"
import mongoose from "mongoose"
import { adminAuth, userAuth } from "../fakes/testingAuth.js"
import EventSource from 'eventsource'

/**
 * @param { string } url
 * @param { "get" | "post" | "delete" | "patch" | "put" } method
 * @param { { body: any adminId: string } } options
 */
async function adminRequest(url, method, options) {
    return request(await server)[method](url)
        .set(adminAuth(options?.adminId))
        .send(options?.body)
}

/**
 * @param { string } url
 * @param { "get" | "post" | "delete" | "patch" | "put" } method
 * @param { { body: any userId: string } } options
*/
async function userRequest(url, method, options) {
    return request(await server)[method](url)
        .set(userAuth(options?.userId))
        .send(options?.body)
}

/**
 * @param { string } url
 * @param { "get" | "post" | "delete" | "patch" | "put" } method
 * @param { any } body
*/
async function anyRequest(url, method, body) {
    return request(await server)[method](url).send(body)
}

async function createEventSource(routePath) {
    return new EventSource(request(await server).get(routePath).url, { headers: adminAuth() });
};

async function closeTestingServer() {
    await mongoose.disconnect();
    (await server).close();
}

export {
    userRequest,
    adminRequest,
    anyRequest,
    closeTestingServer,
    createEventSource
}
