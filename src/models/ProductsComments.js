import { model, Schema, Types } from "mongoose";

const CommentsSchema = new Schema(
    {
        _id: false,
        id: {
            type: String,
            required: true,
        },
        commenterId: {
            type: Types.ObjectId,
            required: true,
        },
        commenterData: {
            type: {
                id: Types.ObjectId,
                userName: String,
                avatar: String
            }
        },
        text: {
            type: String,
            required: true
        },
        likes: {
            type: [Types.ObjectId],
            default: []
        },
        dislikes: {
            type: [Types.ObjectId],
            default: []
        }
    },
    { timestamps: true }
);

const ProductCommentSchema = new Schema({
    productId: {
        type: Types.ObjectId,
        required: true
    },
    comments: {
        type: [CommentsSchema],
        default: []
    }
});

const ProductsCommentsModel = model("products-comments", ProductCommentSchema);

export default ProductsCommentsModel;