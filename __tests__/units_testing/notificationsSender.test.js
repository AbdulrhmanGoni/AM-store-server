import databaseConnections from "../../src/configuration/databaseConnections.js"
import NotificationsModel from "../../src/models/Notifications.js"
import { jest } from "@jest/globals"
import { disconnect } from "mongoose"
import notificationsSender from "../../src/utilities/notificationsSender.js"
import eventEmiter from "../../src/utilities/eventEmiter.js"

eventEmiter.emit = jest.fn();

beforeAll(async () => {
    await databaseConnections();
})

afterAll(async () => {
    eventEmiter.emit.mockReset();
    await NotificationsModel.deleteMany({});
    await disconnect();
})

describe("Test 'notificationsSender' function", () => {

    it("Should saves the notification to the database and uses `eventEmiter.emit` function to fire \"notification\" event", async () => {
        const notification = {
            type: "success",
            title: "Testing notification"
        }
        const done = await notificationsSender(notification)
        expect(eventEmiter.emit).toHaveBeenCalledWith("notification", expect.objectContaining(notification))
        expect(done).toBe(true)
    })

    it("Should returns `false` and don't save anything to the database because there is no notification provided", async () => {
        console.log = jest.fn(() => { })
        const done = await notificationsSender()
        expect(done).toBe(false)
        console.log.mockReset()
    })

})