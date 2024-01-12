import { Schema, model } from "mongoose";
import { RequiredNumber, RequiredString, RequiredObjectId, ANumber } from "../utilities/schemaTypesOptions.js";

const RatingSchema = new Schema({
    _id: false,
    raterId: RequiredObjectId(),
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})

const ProductSchema = new Schema({
    title: RequiredString({ minLingth: 6 }),
    price: RequiredNumber(),
    images: {
        type: [String],
        required: true
    },
    category: RequiredString(),
    series: RequiredString(),
    description: RequiredString({ minLingth: 12, maxLingth: 300 }),
    amount: RequiredNumber(),
    count: Number,
    earnings: ANumber(),
    sold: ANumber(),
    ratings: {
        type: [RatingSchema],
        default: []
    },
    discount: Number
},
    {
        timestamps: true,
        virtuals: {
            rating: {
                get() {
                    if (this.ratings) {
                        const reviews = this.ratings?.length || 0;
                        const costomersRatings = this.ratings?.reduce((acc, current) => acc + current.rating, 0)
                        return {
                            reviews,
                            ratingAverage: +(costomersRatings / reviews).toFixed(1) || 0
                        }
                    }
                    return;
                }
            }
        },
        id: false,
        toJSON: {
            virtuals: true,
            transform(_doc, ret) {
                delete ret.ratings;
                return ret;
            }
        }
    }
);

const ProductsModel = model("products", ProductSchema);

export default ProductsModel;