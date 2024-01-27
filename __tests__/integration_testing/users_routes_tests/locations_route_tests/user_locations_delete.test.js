import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { fakeLocations } from "../../../fakes/fakesLocations.js"
import { closeTestServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestServer()
})

const routePath = (userId) => `/api/users/${userId}/locations`

describe("Test 'user_locations_delete' route handler", () => {

    it("Should deletes a location from user's userAddress and returns `true`", async () => {
        const locationToDelete = fakeLocations[1].id
        const user = {
            ...fakeUser,
            userAddress: {
                locationsList: fakeLocations,
                selectedLocation: fakeLocations[0]
            }
        };
        const { _id: userId } = await UsersModel.create(user);
        const requestOptions = { userId, body: { locationId: locationToDelete } };
        const response = await userRequest(routePath(userId), "delete", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userAddress } = await UsersModel.findById(userId, { userAddress: true });
        expect(userAddress.locationsList.length).toBe(fakeLocations.length - 1);
        expect(userAddress.locationsList).not.toEqual(
            expect.arrayContaining([{ id: locationToDelete }])
        );
    })

    it("Should deletes a location from user's userAddress and returns `true`", async () => {
        const locationToDelete = fakeLocations[0].id
        const user = {
            ...fakeUser,
            userAddress: {
                locationsList: fakeLocations,
                selectedLocation: fakeLocations[0]
            }
        };
        const { _id: userId } = await UsersModel.create(user);
        const requestOptions = { userId, body: { locationId: locationToDelete } };
        const response = await userRequest(routePath(userId), "delete", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userAddress } = await UsersModel.findById(userId, { userAddress: true });
        expect(userAddress.locationsList.length).toBe(fakeLocations.length - 1);
        expect(userAddress.locationsList).not.toEqual(
            expect.arrayContaining([{ id: locationToDelete }])
        );
        expect(userAddress.selectedLocation).toBeNull()
    })

})