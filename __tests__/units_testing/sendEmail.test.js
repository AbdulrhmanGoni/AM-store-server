import { jest } from "@jest/globals"
import { fakeUser } from "../fakes/fakeUsers.js"

jest.unstable_mockModule("../../src/utilities/sendEmail.js", () => {
    return {
        esModules: true,
        default: jest.fn(() => true)
    }
})

const sendEmail = (await import("../../src/utilities/sendEmail.js")).default;

afterAll(async () => {
    sendEmail.mockReset()
})

describe("Test 'sendEmail' function", () => {

    it("Should sends a mail to specific address and returns `true`", async () => {
        const { userEmail } = fakeUser
        const done = await sendEmail(
            userEmail,
            "Testing mail",
            "Wellcome to testing environment"
        );
        expect(done).toBe(true);
        expect(sendEmail.mock.lastCall).toEqual(expect.arrayContaining([
            userEmail,
            "Testing mail",
            "Wellcome to testing environment"
        ]))
    })

})