import mongoose from "mongoose"
import server from "../../../src/server.js"
import { user } from "../../fakes/fakeUsers.js"
import UsersModel from "../../../src/models/Users.js"
import { userRequest } from "../../helpers/testRequest.js"
import { hashSync } from "bcrypt"

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = (userId) => `/api/users/${userId}/check-password`

describe("Test 'user_checkPassword_post' route handler", () => {

    const userPassword = "testing_password_123"
    const hashedPassword = hashSync(userPassword, +process.env.HASHING_SALT_ROUNDS);

    it("Should checks the sent password with user's password and returns `{ ok: true }`", async () => {
        user.userPassword = hashedPassword;
        const { _id: userId } = await UsersModel.create(user);
        const requestBody = { password: userPassword }
        const response = await userRequest(routePath(userId), "post", { body: requestBody, userId });
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
    })

    it("Should checks the sent password with user's password and returns \"Wrong password !\" message", async () => {
        user.userPassword = hashedPassword;
        const { _id: userId } = await UsersModel.create(user);
        const requestBody = { password: "wrong_testing_password" }
        const response = await userRequest(routePath(userId), "post", { body: requestBody, userId });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("Wrong password !");
    })

})