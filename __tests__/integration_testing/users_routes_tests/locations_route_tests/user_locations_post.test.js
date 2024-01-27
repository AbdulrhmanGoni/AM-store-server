import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getRandomLocation, fakeLocations } from "../../../fakes/fakesLocations.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer()
})

const routePath = (userId) => `/api/users/${userId}/locations`

describe("Test 'user_locations_post' route handler", () => {

    it("Should adds a location into user's address and returns `true`", async () => {
        const fakeLocation = { ...getRandomLocation() }
        delete fakeLocation.id;
        const { _id: userId } = await UsersModel.create(fakeUser);
        const requestOptions = { userId, body: { theLocation: fakeLocation } };
        const response = await userRequest(routePath(userId), "post", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userAddress } = await UsersModel.findById(userId, { userAddress: true });
        expect(userAddress.locationsList[0]).toMatchObject(fakeLocation);
        expect(userAddress.selectedLocation).toMatchObject(fakeLocation);
    })

    it("Should sets a location as selected location in user's address and returns `true`", async () => {
        const locationToSelect = fakeLocations[1]
        const user = {
            ...fakeUser,
            userAddress: {
                locationsList: fakeLocations,
                selectedLocation: fakeLocations[0]
            }
        };
        const { _id: userId } = await UsersModel.create(user);
        const requestOptions = { userId, body: { theLocation: locationToSelect, type: "newSelected" } };
        const response = await userRequest(routePath(userId), "post", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { userAddress } = await UsersModel.findById(userId, { userAddress: true });
        expect(userAddress.selectedLocation).toMatchObject(locationToSelect);
        fakeLocations.forEach((location, index) => {
            expect(userAddress.locationsList[index]).toMatchObject(location)
        })
    })

})