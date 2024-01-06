import { model, Schema } from "mongoose";
import { ArrayOfObjectIds, RequiredString, ObjectId, RequiredObjectId } from "../utilities/schemaTypesOptions.js";

const CommentsSchema = new Schema(
    {
        _id: false,
        id: RequiredString(),
        commenterId: RequiredObjectId(),
        commenterData: {
            id: ObjectId,
            userName: String,
            avatar: String
        },
        text: RequiredString({ maxLength: 300, minLength: 1 }),
        likes: ArrayOfObjectIds(),
        dislikes: ArrayOfObjectIds()
    },
    { timestamps: true }
);

const ProductCommentSchema = new Schema({
    productId: RequiredObjectId(),
    comments: {
        type: [CommentsSchema],
        default: []
    }
});

const ProductsCommentsModel = model("products-comments", ProductCommentSchema);

export default ProductsCommentsModel;