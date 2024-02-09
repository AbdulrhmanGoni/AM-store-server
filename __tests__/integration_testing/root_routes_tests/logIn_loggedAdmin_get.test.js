import { adminRequest, anyRequest, closeTestingServer, userRequest } from "../../helpers/testRequest.js"
import AdminModel from "../../../src/models/Admins.js"
import { fakeAdmin } from "../../fakes/fakeUsers.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await AdminModel.deleteMany({})
})

const routePath = (adminId) => `/api/admin-log-in/${adminId}`

describe("Test 'logIn_loggedAdmin_get' route handler", () => {

    it("Should returns admin's initial data", async () => {
        const { _id } = await AdminModel.create(fakeAdmin)
        const response = await adminRequest(routePath(_id), "get", { adminId: _id });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            _id: _id.toString(),
            adminName: fakeAdmin.adminName,
            adminEmail: fakeAdmin.adminEmail,
            avatar: fakeAdmin.avatar
        });
    })

    it("Should returns unauthorized error", async () => {
        const response = await userRequest(routePath(), "get");
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatch("not admin")
    })

    it("Should returns unauthorized error", async () => {
        const response = await anyRequest(routePath(), "get");
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatch("need some credentials")
    })

})