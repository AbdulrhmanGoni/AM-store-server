import mongoose from "mongoose"
import server from "../../../../src/server.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import UsersModel from "../../../../src/models/Users.js"
import { userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = `/api/users`

describe("Test 'user_get' route handler", () => {

    it("Should returns user's data", async () => {
        const { _id } = await UsersModel.create(fakeUser);
        const response = await userRequest(`${routePath}/${_id}`, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            userName: fakeUser.userName,
            userEmail: fakeUser.userEmail,
            avatar: fakeUser.avatar
        });
    })

})