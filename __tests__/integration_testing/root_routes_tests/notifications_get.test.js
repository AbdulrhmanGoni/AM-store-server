import NotificationsModel from "../../../src/models/Notifications.js"
import notificationsSender from "../../../src/utilities/notificationsSender.js"
import fakesNotifications from "../../fakes/fakesNotifications.js"
import { closeTestingServer, createEventSource } from "../../helpers/testRequest.js"
import waitFor from "../../helpers/waitFor.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await NotificationsModel.deleteMany({})
})

const routePath = "/api/notifications"

describe("GET /api/notifications", () => {

    const fakeNotification = {
        type: "info",
        title: "A new Order created",
        readBy: []
    }

    it("Should returns the new added notification through `eventSource.onmessage`", async () => {
        const eventSource = await createEventSource(routePath)
        eventSource.onmessage = (messageEvent => {
            const data = JSON.parse(messageEvent.data);
            if (!(Array.isArray(data)) && data) {
                expect(data).toMatchObject(fakeNotification);
            }
        })

        await waitFor(.01);
        await notificationsSender(fakeNotification);
        await waitFor(.01, () => { eventSource.close() });
    })

    it("Should returns a list of notifications and then returns the new added notification through `eventSource.onmessage`", async () => {
        await NotificationsModel.insertMany(fakesNotifications);
        const eventSource = await createEventSource(routePath)
        eventSource.onmessage = (messageEvent => {
            const data = JSON.parse(messageEvent.data);
            if (Array.isArray(data)) {
                data.forEach(notification => {
                    expect(["success", "info", "error", "warning"]).toContain(notification.type)
                    expect(notification).toMatchObject({ title: expect.any(String), readBy: [] })
                })
            } else {
                expect(data).toMatchObject(fakeNotification);
            }
        })
        await waitFor(.01);
        await notificationsSender(fakeNotification);
        await waitFor(.01, () => { eventSource.close() });
    })

})