import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getRandomPaymentMethods, fakePaymentMethods } from "../../../fakes/fakesPaymentMethods.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer()
})

const routePath = (userId) => `/api/users/${userId}/payment-methods`

describe("Test 'user_paymentMethods_post' route handler", () => {

    it("Should adds a payment method into user's Payment Methodes and returns `true`", async () => {
        const fakePaymentMethods = getRandomPaymentMethods()
        const { _id: userId } = await UsersModel.create(fakeUser);
        const requestOptions = { userId, body: { theCard: fakePaymentMethods } };
        const response = await userRequest(routePath(userId), "post", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userPaymentMethodes } = await UsersModel.findById(userId, { userPaymentMethodes: true });
        expect(userPaymentMethodes.cardsList[0]).toMatchObject(fakePaymentMethods);
        expect(userPaymentMethodes.choosedMethod).toMatchObject(fakePaymentMethods);
    })

    it("Should sets a payment method as choosed method in user's Payment Methodes and returns `true`", async () => {
        const paymentMethodToSelect = fakePaymentMethods[1]
        const user = {
            ...fakeUser,
            userPaymentMethodes: {
                cardsList: fakePaymentMethods,
                choosedMethod: fakePaymentMethods[0]
            }
        };
        const { _id: userId } = await UsersModel.create(user);
        const requestOptions = { userId, body: { theCard: paymentMethodToSelect, type: "choosedMethod" } };
        const response = await userRequest(routePath(userId), "post", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userPaymentMethodes } = await UsersModel.findById(userId, { userPaymentMethodes: true });
        expect(userPaymentMethodes.choosedMethod).toMatchObject(paymentMethodToSelect);
        fakePaymentMethods.forEach((card, index) => {
            expect(userPaymentMethodes.cardsList[index]).toMatchObject(card)
        })
    })

})