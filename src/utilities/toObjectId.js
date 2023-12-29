import { Types } from "mongoose";

export default function toObjectId(id) {
    try {
        return new Types.ObjectId(id)
    } catch {
        return id
    }
}