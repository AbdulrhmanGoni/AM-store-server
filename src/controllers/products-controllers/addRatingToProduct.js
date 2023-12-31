import ProductsModel from "../../models/Products.js";
import toObjectId from "../../utilities/toObjectId.js";

export default async function addRatingToProduct(productId, userId, theRating) {
    try {
        const raterId = toObjectId(userId);
        const rating = { raterId, rating: theRating };
        const filter = { _id: productId, $nor: [{ "ratings.raterId": raterId }] }
        const response = await ProductsModel.updateOne(filter, { $push: { ratings: rating } });
        if (response.modifiedCount) return true
        else {
            const filter = { _id: productId, "ratings.raterId": raterId }
            const response = await ProductsModel.updateOne(filter, { $set: { "ratings.$.rating": theRating } });
            return !!response.modifiedCount
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}
