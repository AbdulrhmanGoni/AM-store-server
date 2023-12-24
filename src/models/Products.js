import { Schema, Types, model } from "mongoose";

const RatingSchema = new Schema({
    _id: false,
    raterId: {
        type: Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLingth: 6
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLingth: 12
    },
    amount: {
        type: Number,
        required: true
    },
    count: Number,
    earnings: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
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
                    const reviews = this.ratings.length || 0;
                    const costomersRatings = this.ratings.reduce((acc, current) => acc + current.rating, 0)
                    return {
                        reviews,
                        ratingAverage: +(costomersRatings / reviews).toFixed(1) || 0
                    }
                }
            }
        },
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