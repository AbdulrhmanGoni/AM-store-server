import { fakeUser } from "../../../fakes/fakeUsers.js"
import UsersModel from "../../../../src/models/Users.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
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