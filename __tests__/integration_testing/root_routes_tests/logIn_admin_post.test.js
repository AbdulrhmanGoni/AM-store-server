import { closeTestingServer, anyRequest } from "../../helpers/testRequest.js"
import { fakeAdmin } from "../../fakes/fakeUsers.js"
import AdminsModel from "../../../src/models/Admins.js"
import { hashSync } from "bcrypt"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await AdminsModel.deleteMany({})
})

const routePath = "/api/admin-log-in"

describe("Test 'logIn_admin_post' route handler", () => {

    it("Should logs in the admin and returns admin's id with his access token", async () => {
        const adminPassword = "testing.password.999"
        fakeAdmin.adminPassword = hashSync(adminPassword, 10);
        const { _id } = await AdminsModel.create(fakeAdmin)
        const requestBody = { adminEmail: fakeAdmin.adminEmail, adminPassword }

        const response = await anyRequest(routePath, "post", requestBody);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            adminData: {
                _id: _id.toString(),
                adminName: fakeAdmin.adminName,
                adminEmail: fakeAdmin.adminEmail,
                avatar: fakeAdmin.avatar,
                signingMethod: 'Email and Password'
            },
            accessToken: expect.any(String),
            ok: true
        });
    })

    it("Should returns an error with \"Failed to get access\" message", async () => {

        const requestBody = {
            adminEmail: fakeAdmin.adminEmail,
            adminPassword: "testing.password.999"
        }

        const response = await anyRequest(routePath, "post", requestBody);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatch("Unauthorized Email")
    })

})