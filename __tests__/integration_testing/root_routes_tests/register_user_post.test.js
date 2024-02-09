import { fakeUser } from "../../fakes/fakeUsers.js"
import UsersModel from "../../../src/models/Users.js"
import { jest } from "@jest/globals"

jest.unstable_mockModule("../../../src/utilities/checkEmailExistance.js", () => ({
    __esModules: true,
    default: jest.fn()
}))

const { closeTestingServer, anyRequest } = (await import("../../helpers/testRequest.js"));
const { default: checkEmailExistance } = (await import("../../../src/utilities/checkEmailExistance.js"));

afterAll(async () => {
    checkEmailExistance.mockReset();
    await closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = "/api/sign-up"

describe("Test 'register_user_post' route handler", () => {

    const { userEmail, userName } = fakeUser

    it("Should signs the user and returns its data with access token", async () => {
        const requestBody = {
            userName,
            userEmail,
            userPassword: "testing.password.999",
        }

        checkEmailExistance.mockReturnValue(true)
        const response = await anyRequest(routePath, "post", requestBody)
        expect(response.statusCode).toBe(200)
        expect(checkEmailExistance).toHaveBeenCalledTimes(1)
        expect(checkEmailExistance).toHaveBeenNthCalledWith(1, userEmail);
        expect(response.body).toMatchObject({
            ok: true,
            payload: {
                userData: {
                    _id: expect.any(String),
                    userName,
                    userEmail,
                    hisEmailVerified: false
                },
                token: expect.any(String),
            }
        })
    })

    it("Should returns an error with message \"Your email is not active\"", async () => {
        const requestBody = {
            userName: "Mohammed",
            userEmail: "mohammed.king.cool.great@yahoo.com",
            userPassword: "testing.pasword.king",
        }

        checkEmailExistance.mockReturnValue(false)
        const response = await anyRequest(routePath, "post", requestBody)
        expect(response.statusCode).toBe(200)
        expect(checkEmailExistance).toHaveBeenCalledTimes(2)
        expect(checkEmailExistance).toHaveBeenNthCalledWith(2, requestBody.userEmail);
        expect(response.body).toMatchObject({
            ok: false,
            message: expect.stringContaining("email is not active")
        })
    })

    it("Should returns an error with message \"Your email already signed up with up, Just log in\"", async () => {
        await UsersModel.create(fakeUser)
        const requestBody = {
            userName,
            userEmail,
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