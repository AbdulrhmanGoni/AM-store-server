import createProjection from "../../src/utilities/createProjection.js"

test("should returns an object with keys from the gevin string + _id: true", () => {
    expect(createProjection("title,price,images"))
        .toEqual({ _id: true, title: true, images: true, price: true })
})
