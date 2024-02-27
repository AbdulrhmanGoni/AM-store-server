import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { fakePaymentMethods } from "../../../fakes/fakesPaymentMethods.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer()
})

const routePath = (userId) => `/api/users/${userId}/payment-methods`

describe("DELETE /api/users/:userId/payment-methods", () => {

    it("Should deletes a payment method from user's Payment Methods list and returns `true`", async () => {
        const paymentMethodToDelete = fakePaymentMethods[1].number
        const user = {
            ...fakeUser,
            userPaymentMethodes: {
                cardsList: fakePaymentMethods,
                choosedMethod: fakePaymentMethods[0]
            }
        };
        const { _id: userId } = await UsersModel.create(user);
        const requestOptions = { userId, body: { cardNumber: paymentMethodToDelete } };
        const response = await userRequest(routePath(userId), "delete", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userPaymentMethodes } = await UsersModel.findById(userId, { userPaymentMethodes: true });
        expect(userPaymentMethodes.cardsList.length).toBe(fakePaymentMethods.length - 1);
        expect(userPaymentMethodes.cardsList).not.toEqual(
            expect.arrayContaining([{ number: paymentMethodToDelete }])
        );
    })

    it("Should deletes the choosed payment method from user's Payment Methods list and returns `true`", async () => {
        const paymentMethodToDelete = fakePaymentMethods[0].number
        const user = {
            ...fakeUser,
            userPaymentMethodes: {
                cardsList: fakePaymentMethods,
                choosedMethod: fakePaymentMethods[0]
            }
        };
        const { _id: userId } = await UsersModel.create(user);
        const requestOptions = { userId, body: { cardNumber: paymentMethodToDelete } };
        const response = await userRequest(routePath(userId), "delete", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userPaymentMethodes } = await UsersModel.findById(userId, { userPaymentMethodes: true });
        expect(userPaymentMethodes.cardsList.length).toBe(fakePaymentMethods.length - 1);
        expect(userPaymentMethodes.cardsList).not.toEqual(
            expect.arrayContaining([{ id: paymentMethodToDelete }])
        );
        expect(userPaymentMethodes.choosedMethod).toBeNull()
    })

})