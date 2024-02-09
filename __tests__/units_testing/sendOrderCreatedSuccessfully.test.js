import { jest } from "@jest/globals"
import { fakeUser } from "../fakes/fakeUsers.js"

jest.unstable_mockModule("../../src/utilities/sendEmail.js", () => {
    return {
        esModules: true,
        default: jest.fn(() => true)
    }
})

const sendOrderCreatedSuccessfully = (await import("../../src/utilities/sendOrderCreatedSuccessfully.js")).default
const sendEmail = (await import("../../src/utilities/sendEmail.js")).default

afterAll(async () => {
    sendEmail.mockReset()
})

describe("Test 'sendOrderCreatedSuccessfully' function", () => {

    it("Should uses `sendEmail` function to send a mail to the user tells him that his order created", async () => {
        const { userEmail, userName } = fakeUser
        const result = await sendOrderCreatedSuccessfully({ userEmail, userName });
        expect(result).toBe(true);
        expect(sendEmail.mock.lastCall).toEqual(expect.arrayContaining([
            userEmail,
            "Your order has created successfully",
            expect.stringMatching(`Hi ${userName}`),
            expect.stringMatching("Thank you for shopping in our store"),
            expect.stringMatching("We received your order")
        ]))
    })

})