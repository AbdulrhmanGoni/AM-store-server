import NotificationsModel from "../../../src/models/Notifications.js"
import fakesNotifications from "../../fakes/fakesNotifications.js"
import { fakeAdminId } from "../../fakes/testingAuth.js"
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await NotificationsModel.deleteMany({})
})

const routePath = "/api/notifications"

describe("POST /api/notifications", () => {

    it("Should sets one notificatios as read", async () => {
        const notifications = await NotificationsModel.insertMany(fakesNotifications);
        const notificationsToSetAsRead = [notifications[0]._id]
        const requestObject = {
            body: { notificationsIds: notificationsToSetAsRead },
            adminId: fakeAdminId
        };
        const response = await adminRequest(routePath, "post", requestObject);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        expect((await NotificationsModel.find({}))?.some((notification) => {
            return notification.readBy[0].toString() === fakeAdminId
        })).toBe(true)
    })

    it("Should sets all notificatios as read", async () => {
        const notifications = await NotificationsModel.insertMany(fakesNotifications);
        const notificationsToSetAsRead = notifications.map((not) => not._id)
        const requestObject = {
            body: { notificationsIds: notificationsToSetAsRead },
            adminId: fakeAdminId
        };
        const response = await adminRequest(routePath, "post", requestObject);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        expect((await NotificationsModel.find({}))?.every((notification) => {
            return notification.readBy[0].toString() === fakeAdminId
        })).toBe(true)
    })

})