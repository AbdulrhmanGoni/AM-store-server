import UsersModel from "../../../src/models/Users.js"
import { anyRequest, closeTestingServer } from "../../helpers/testRequest.js"
import { fakeUser } from "../../fakes/fakeUsers.js"
import { compareSync } from "bcrypt"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer()
})

const routePath = (type) => `/api/forget-password?type=${type}`

describe("Test 'forgetPassword_post' route handler", () => {

    it("Should changes user's password through \"/forget-password\" route by three steps", async () => {

        const { _id: userId, userEmail } = await UsersModel.create(fakeUser);
        const newUserPassword = "new#testing/password.000"
        const request = async (type, body) => {
            return await anyRequest(routePath(type), "post", body)
        }

        // [1] Send change password request 
        const response1 = await request("changing-password-request", { userEmail });
        expect(response1.statusCode).toBe(200);
        expect(response1.body).toBe(true);

        // [2] Send verification code to continue changing the password 
        const response2 = await request("proving-email-ownership", { verificationCode: 999999, userEmail });
        expect(response2.statusCode).toBe(200);
        expect(response2.body).toEqual({ ok: true, changePasswordToken: expect.any(String) });

        // [3] Send the new password to complete changing the password
        const request3Body = {
            userEmail,
            changePasswordToken: response2.body.changePasswordToken,
            newPassword: newUserPassword
        }
        const response3 = await request("complete-changing-password", request3Body);
        expect(response3.statusCode).toBe(200);
        expect(response3.body).toBe(true);

        const { userPassword } = await UsersModel.findById(userId);
        expect(compareSync(newUserPassword, userPassword)).toBe(true);

    })

})