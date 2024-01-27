import UsersModel from "../../../../src/models/Users.js"
import { fakeLocations } from "../../../fakes/fakesLocations.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await UsersModel.deleteMany({});
})

const routePath = (userId) => `/api/users/${userId}/locations`

describe("Test 'user_locations_get' route handler", () => {

    it("Should returns an empty user's locations object", async () => {
        const { _id: userId } = await UsersModel.create(fakeUser);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body.locationsList.length).toBe(0);
        expect(response.body.selectedLocation).toBeUndefined();
    })

    it("Should returns user's locations object", async () => {
        const user = {
            ...fakeUser,
            userAddress: {
                locationsList: fakeLocations,
                selectedLocation: fakeLocations[0]
            }
        }
        const { _id: userId } = await UsersModel.create(user);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body.locationsList.length).toBe(fakeLocations.length);
        expect(response.body.locationsList).toEqual(expect.arrayContaining(fakeLocations));
        expect(response.body.selectedLocation).toMatchObject(fakeLocations[0]);
    })

})