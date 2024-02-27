import { fakeUser } from "../../../fakes/fakeUsers.js"
import UsersModel from "../../../../src/models/Users.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = (userId) => `/api/users/${userId}`

describe("GET /api/users/:userId", () => {

    it("Should returns user's data", async () => {
        const { _id: userId } = await UsersModel.create(fakeUser);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            userName: fakeUser.userName,
            userEmail: fakeUser.userEmail,
            avatar: fakeUser.avatar
        });
    })

    it("Should returns (401) status code with message \"Failed to Authenticate the user\"", async () => {
        const response = await userRequest(routePath("644c8f99b5901d2948e81a72"), "get");
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatch("Failed to Authenticate");
    })

    it("Should returns (404) status code with \"\"", async () => {
        const response = await userRequest(routePath(""), "get");
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch("Sorry, the content you're looking for doesn't exist.");
    })

})