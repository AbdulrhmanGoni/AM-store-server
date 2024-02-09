import UsersModel from "../../../src/models/Users.js";
import { fakeUsers } from "../../fakes/fakeUsers.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer();
})

const queryKey = "users-overview"
const routePath = (page, pageSize) => `/api/statistics?queryKey=${queryKey}&page=${page}&pageSize=${pageSize}`

describe(`Test 'statistics_get' route handler with queryKey: "${queryKey}"`, () => {

    it("Should returns an empty array because there is no users yet", async () => {
        const response = await adminRequest(routePath(1, 5), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.users).toHaveLength(0);
        expect(response.body.isThereNextPage).toBe(false);
    })

    it("Should returns an array of 4 users `isThereNextPage: true`", async () => {
        await UsersModel.insertMany(fakeUsers);
        const response = await adminRequest(routePath(1, 4), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.users).toHaveLength(4);
        expect(response.body.isThereNextPage).toBe(true);
        response.body.users.forEach((user) => {
            expect(user).toMatchObject({
                _id: expect.any(String),
                userName: expect.any(String),
                userEmail: expect.any(String),
                avatar: expect.any(String),
                hisEmailVerified: expect.any(Boolean),
                userOrders: expect.any(Number)
            })
        })
    })

    it("Should returns an array of 2 users with `isThereNextPage: false`", async () => {
        const response = await adminRequest(routePath(2, 4), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.users).toHaveLength(2);
        expect(response.body.isThereNextPage).toBe(false);
        response.body.users.forEach((user) => {
            expect(user).toMatchObject({
                _id: expect.any(String),
                userName: expect.any(String),
                userEmail: expect.any(String),
                avatar: expect.any(String),
                hisEmailVerified: expect.any(Boolean),
                userOrders: expect.any(Number)
            })
        })
    })

})
