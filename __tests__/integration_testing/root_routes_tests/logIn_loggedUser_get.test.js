import { anyRequest, closeTestingServer, userRequest } from "../../helpers/testRequest.js"
import { fakeUser } from "../../fakes/fakeUsers.js"
import UsersModel from "../../../src/models/Users.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = (userId) => `/api/log-in/${userId}`

describe("Test 'logIn_loggedUser_get' route handler", () => {

    it("Should returns user's initial data", async () => {
        const { _id } = await UsersModel.create(fakeUser)
        const response = await userRequest(routePath(_id), "get", { userId: _id });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            userData: {
                _id: _id.toString(),
                userName: fakeUser.userName,
                userEmail: fakeUser.userEmail,
                avatar: fakeUser.avatar,
                hisEmailVerified: false
            },
            favorites: [],
            shoppingCart: []
        });
    })

    it("Should returns bad request error", async () => {
        const unknownId = "66bb2d08884089e4f2efcc7b"
        const response = await userRequest(routePath(unknownId), "get", { userId: unknownId });
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeFalsy();
    })

    it("Should returns unauthorized error", async () => {
        const response = await anyRequest(routePath(), "get");
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatch("You need some credentials")
    })

})