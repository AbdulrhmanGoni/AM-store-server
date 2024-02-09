import UsersModel from "../../../src/models/Users.js"
import { fakeUser } from "../../fakes/fakeUsers.js"
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

const { userRequest, closeTestingServer } = (await import("../../helpers/testRequest.js"))
const { default: genRandomNumber } = (await import("../../../src/utilities/genRandomNumber.js"))
const { default: sendEmail } = (await import("../../../src/utilities/sendEmail.js"))

afterAll(async () => {
    genRandomNumber.mockRestore();
    sendEmail.mockRestore();
    await UsersModel.deleteMany({});
    await closeTestingServer();
})

const routePath = "/api/email-verification"

describe("Test user's email verification process", () => {

    it("Should sets user's `hisEmailVerified` field to `true`", async () => {
        const { _id: userId, userEmail, userName } = await UsersModel.create(fakeUser);

        const request = async (method, body) => {
            return await userRequest(routePath, method, body);
        }

        // [1] Send verification email request 
        const response1 = await request("get", { body: { userEmail }, userId });
        expect(response1.statusCode).toBe(200);
        expect(response1.body.ok).toBe(true);
        expect(genRandomNumber).toHaveBeenCalledTimes(1);
        expect(genRandomNumber).toHaveBeenCalledWith(6);
        expect(sendEmail).toHaveBeenCalledTimes(1);
        expect(sendEmail.mock.calls[0]).toEqual(
            expect.arrayContaining([
                userEmail,
                "AM Store Email Verification",
                expect.stringMatching("Wellcome to AM Store"),
                expect.stringMatching(`${fakeVerificationCode}`),
                expect.stringMatching("verification code"),
                expect.stringMatching(userName)
            ])
        );

        // [2] Send verification code to complete verifying email 
        const requestOptions = {
            userId,
            body: { verificationCode: fakeVerificationCode, userEmail }
        }
        const response2 = await request("post", requestOptions)
        expect(response2.statusCode).toBe(200);
        expect(response2.body.ok).toBe(true);
        const { hisEmailVerified } = await UsersModel.findOne({ _id: userId }, { hisEmailVerified: 1 })
        expect(hisEmailVerified).toBe(true);

    })

})