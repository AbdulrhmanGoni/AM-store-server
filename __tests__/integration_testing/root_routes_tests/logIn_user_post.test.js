import { closeTestingServer, anyRequest } from "../../helpers/testRequest.js"
import { fakeUser } from "../../fakes/fakeUsers.js"
import UsersModel from "../../../src/models/Users.js"
import { hashSync } from "bcrypt"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = "/api/log-in"

describe("POST /api/log-in", () => {

    it("Should logs in the user and returns user's id with his access token", async () => {
        const userPassword = "testing.password.999"
        fakeUser.userPassword = hashSync(userPassword, 10)
        const { _id } = await UsersModel.create(fakeUser)
        const requestBody = { userEmail: fakeUser.userEmail, userPassword }
        const response = await anyRequest(routePath, "post", requestBody);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            status: true,
            userId: _id.toString(),
            accessToken: expect.any(String)
        });
    })

    it("Should returns an error with \"email did not signed up\" message", async () => {
        const requestBody = {
            userEmail: fakeUser.userEmail,
            userPassword: "testing.password.999",
        }

        const response = await anyRequest(routePath, "post", requestBody);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("email did not signed up");
    })

})