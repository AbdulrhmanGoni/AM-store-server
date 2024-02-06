import UsersModel from "../../../src/models/Users.js"
import { fakeUser } from "../../fakes/fakeUsers.js"
import { compareSync } from "bcrypt"
import { jest } from "@jest/globals"

const fakeVerificationCode = 999999;

jest.unstable_mockModule("../../../src/utilities/genRandomNumber.js", () => ({
    __esModule: true,
    default: jest.fn(() => fakeVerificationCode)
}));

jest.unstable_mockModule("../../../src/utilities/sendEmail.js", () => ({
    __esModule: true,
    default: jest.fn(() => true)
}));

const { anyRequest, closeTestingServer } = (await import("../../helpers/testRequest.js"))
const { default: genRandomNumber } = (await import("../../../src/utilities/genRandomNumber.js"))
const { default: sendEmail } = (await import("../../../src/utilities/sendEmail.js"))

afterAll(async () => {
    genRandomNumber.mockRestore();
    sendEmail.mockRestore();
    await UsersModel.deleteMany({});
    await closeTestingServer();
})

const routePath = (type) => `/api/forget-password?type=${type}`

describe("Test 'forgetPassword_post' route handler", () => {

    it("Should changes user's password through \"/forget-password\" route by three steps", async () => {

        const { _id: userId, userEmail, userName } = await UsersModel.create(fakeUser);
        const newUserPassword = "new#testing/password.000"
        const request = async (type, body) => {
            return await anyRequest(routePath(type), "post", body)
        }

        // [1] Send change password request 
        const response1 = await request("changing-password-request", { userEmail });
        expect(response1.statusCode).toBe(200);
        expect(response1.body).toBe(true);
        expect(genRandomNumber).toHaveBeenCalledTimes(1);
        expect(genRandomNumber).toHaveBeenCalledWith(6);
        expect(sendEmail).toHaveBeenCalledTimes(1);
        expect(sendEmail.mock.calls[0]).toEqual(
            expect.arrayContaining([
                userEmail,
                "AM Store Changing Password Request",
                expect.stringMatching(`${fakeVerificationCode}`),
                expect.stringMatching(`Hi ${userName}`)
            ])
        );

        // [2] Send verification code to continue changing the password 
        const response2 = await request("proving-email-ownership", { verificationCode: fakeVerificationCode, userEmail });
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