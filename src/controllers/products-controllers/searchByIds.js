import idHandler from "../../utilities/idHandler.js";
import ProductsModel from "../../models/Products.js";
import { Types } from "mongoose";

export default async function searchByIds(productsIds, projection, options) {
    try {
        const { withCount, withPrice } = options;
        const ids = productsIds.map((product => new Types.ObjectId(idHandler(product).id)))
        const pipeline = [
            { $match: { _id: { $in: ids } } },
            { $project: projection }
        ]

        const addFieldsStage = {};

        function getValueAt(ValueIndex) {
            return {
                $toDouble: {
                    $arrayElemAt: [
                        {
                            $split: [
                                {
                                    $arrayElemAt: [
                                        productsIds,
                                        { $indexOfArray: [ids, "$_id"] }
                                    ]
                                }
                                , "-"
                            ]
                        },
                        ValueIndex
                    ]
                }
            }
        }

        if (withCount) addFieldsStage.count = getValueAt(1);
        if (withPrice) addFieldsStage.price = getValueAt(2);

        withCount || withPrice && pipeline.push({ $addFields: addFieldsStage });

        const products = await ProductsModel.aggregate(pipeline);
        return products;
    } catch (error) {
        console.log(error)
        return null;
    }
}
