import { fakeUser } from "../../../fakes/fakeUsers.js"
import UsersModel from "../../../../src/models/Users.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"
import { hashSync } from "bcrypt"

afterAll(async () => {
    closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = (userId) => `/api/users/${userId}/check-password`

describe("Test 'user_checkPassword_post' route handler", () => {

    const userPassword = "testing_password_123"
    const hashedPassword = hashSync(userPassword, +process.env.HASHING_SALT_ROUNDS);

    it("Should checks the sent password with user's password and returns `{ ok: true }`", async () => {
        fakeUser.userPassword = hashedPassword;
        const { _id: userId } = await UsersModel.create(fakeUser);
        const requestBody = { password: userPassword }
        const response = await userRequest(routePath(userId), "post", { body: requestBody, userId });
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
    })

    it("Should checks the sent password with user's password and returns \"Wrong password !\" message", async () => {
        fakeUser.userPassword = hashedPassword;
        const { _id: userId } = await UsersModel.create(fakeUser);
        const requestBody = { password: "wrong_testing_password" }
        const response = await userRequest(routePath(userId), "post", { body: requestBody, userId });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("Wrong password !");
    })

})