import { Types } from "mongoose"

export const ObjectId = Types.ObjectId

export function PersonName(moreOptions) {
    return {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 3,
        trim: true,
        ...moreOptions
    }
}
export function Password(moreOptions) {
    return {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 6,
        ...moreOptions
    }
}
export function Email(moreOptions) {
    return {
        type: String,
        required: true,
        maxLength: 320,
        minLength: 5,
        trim: true,
        ...moreOptions
    }
}
export function RequiredString(moreOptions) {
    return {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 3,
        trim: true,
        ...moreOptions
    }
}
export function RequiredNumber(moreOptions) {
    return {
        type: Number,
        required: true,
        ...moreOptions
    }
}
export function ANumber(moreOptions) {
    return {
        type: Number,
        default: 0,
        ...moreOptions
    }
}
export function RequiredObjectId(moreOptions) {
    return {
        type: ObjectId,
        required: true,
        ...moreOptions
    }
}
export function ArrayOfObjectIds(moreOptions) {
    return {
        type: [ObjectId],
        default: [],
        ...moreOptions
    }
}

