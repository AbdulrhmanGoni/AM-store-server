import UsersModel from "../../../../src/models/Users.js"
import { fakePaymentMethods } from "../../../fakes/fakesPaymentMethods.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({});
})

const routePath = (userId) => `/api/users/${userId}/payment-methods`

describe("Test 'user_paymentMethods_get' route handler", () => {

    it("Should returns an empty user's Payment Methods object", async () => {
        const { _id: userId } = await UsersModel.create(fakeUser);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body.cardsList.length).toBe(0);
        expect(response.body.choosedMethod).toBeUndefined();
    })

    it("Should returns user's Payment Methods object", async () => {
        const user = {
            ...fakeUser,
            userPaymentMethodes: {
                cardsList: fakePaymentMethods,
                choosedMethod: fakePaymentMethods[0]
            }
        }
        const { _id: userId } = await UsersModel.create(user);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body.cardsList.length).toBe(fakePaymentMethods.length);

        expect(response.body.choosedMethod).toMatchObject(fakePaymentMethods[0]);

        response.body.cardsList.forEach((card, index) => {
            expect(fakePaymentMethods[index]).toMatchObject(card);
        });
    })

})