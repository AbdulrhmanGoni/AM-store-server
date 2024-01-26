import mongoose from "mongoose"
import server from "../../../src/server.js"
import { user } from "../../fakes/fakeUsers.js"
import UsersModel from "../../../src/models/Users.js"
import { userRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = (userId) => `/api/users/${userId}`

describe("Test 'user_updateUserName_patch' route handler", () => {

    it("Should updates user's name to \"Mohammed\" and returns `true`", async () => {
        const { _id } = await UsersModel.create(user);
        const requestBody = { newName: "Mohammed" }
        const response = await userRequest(routePath(_id), "patch", { body: requestBody, userId: _id });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userName } = await UsersModel.findById(_id, { userName: true });
        expect(userName === "Mohammed").toBe(true);
    })

})