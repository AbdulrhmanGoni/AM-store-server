import { fakeUser } from "../../../fakes/fakeUsers.js"
import UsersModel from "../../../../src/models/Users.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = (userId) => `/api/users/${userId}/upload-avatar`

describe("Test 'user_uploadAvatar_put' route handler", () => {

    it("Should replace user's avatar with a new avatar and returns the new url", async () => {
        const { _id } = await UsersModel.create(fakeUser);
        const requestBody = { avatarUrl: "https://am.store.avatars.com/users/e34fj7d9kfg4k3gd8.png" }
        const response = await userRequest(routePath(_id), "put", { body: requestBody, userId: _id });
        expect(response.statusCode).toBe(200);
        expect(response.body === requestBody.avatarUrl).toBe(true);
    })

})