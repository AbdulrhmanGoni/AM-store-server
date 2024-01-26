import mongoose from "mongoose"
import server from "../../../../src/server.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import UsersModel from "../../../../src/models/Users.js"
import { userRequest } from "../../../helpers/testRequest.js"
import { hashSync, compareSync } from "bcrypt"

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

afterEach(async () => {
    await UsersModel.deleteMany({})
})

const routePath = (userId) => `/api/users/${userId}/change-password`

describe("Test 'user_changePassword_post' route handler", () => {

    it("Should changes user's password to \"new_testing_password_123\" and returns `true`", async () => {
        await changingUserPasswordTest("testing_password_123", "new_testing_password_123")
    })

    it("Should changes user's password to \"new_testing_password_999\" and returns `true`", async () => {
        await changingUserPasswordTest("testing_password_999", "new_testing_password_999")
    })

})

async function changingUserPasswordTest(userPassword, newPassword) {
    const hashedPassword = hashSync(userPassword, +process.env.HASHING_SALT_ROUNDS);
    fakeUser.userPassword = hashedPassword;
    const { _id: userId } = await UsersModel.create(fakeUser);
    const requestBody = { currentPassword: userPassword, newPassword }
    const response = await userRequest(routePath(userId), "post", { body: requestBody, userId });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(true);
    const { userPassword: newUserPassword } = await UsersModel.findById(userId, { userPassword: true });
    expect(compareSync(newPassword, newUserPassword)).toBe(true);
}