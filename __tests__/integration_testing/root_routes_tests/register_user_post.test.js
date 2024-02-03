import { closeTestingServer, anyRequest } from "../../helpers/testRequest.js"
import { fakeUser } from "../../fakes/fakeUsers.js"
import UsersModel from "../../../src/models/Users.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = "/api/sign-up"

describe("Test 'register_user_post' route handler", () => {

    it("Should signs the user and returns its data with access token", async () => {
        const requestBody = {
            userName: fakeUser.userName,
            userEmail: fakeUser.userEmail,
            userPassword: "testing.password.999",
        }

        const response = await anyRequest(routePath, "post", requestBody)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            ok: true,
            payload: {
                userData: {
                    _id: expect.any(String),
                    userName: fakeUser.userName,
                    userEmail: fakeUser.userEmail,
                    hisEmailVerified: false
                },
                token: expect.any(String),
            }
        })
    })

    it("Should returns an error with message \"Your email already signed up with up, Just log in\"", async () => {
        await UsersModel.create(fakeUser)
        const requestBody = {
            userName: fakeUser.userName,
            userEmail: fakeUser.userEmail,
            userPassword: "testing.pasword.123",
        }

        const response = await anyRequest(routePath, "post", requestBody)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            ok: false,
            message: expect.stringContaining("already signed up")
        })
    })

})