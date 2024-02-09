import UsersModel from "../../../src/models/Users.js";
import { fakeUsers } from "../../fakes/fakeUsers.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer();
})

const queryKey = "users-statistics"
const routePath = `/api/statistics?queryKey=${queryKey}`

describe(`Test 'statistics_get' route handler with queryKey: "${queryKey}"`, () => {

    it("Should returns an empty object because there is no users yet", async () => {
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body)).toHaveLength(0);
    })

    it("Should returns users statistics object", async () => {
        await UsersModel.insertMany(fakeUsers);
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            usersCount: fakeUsers.length,
            customersCount: expect.any(Number),
            verifiedUsers: expect.any(Number)
        })
    })

})
