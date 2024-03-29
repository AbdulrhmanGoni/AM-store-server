import idParser from "../../utilities/idParser.js";
import ProductsModel from "../../models/Products.js";
import productRatingPreparingStages from "../../utilities/productRatingPreparingStages.js";
import toObjectId from "../../utilities/toObjectId.js";

export default async function searchByIds(productsIds, projection, options) {
    try {
        const { withCount, withPrice } = options;
        const ids = productsIds.map((product => toObjectId(idParser(product).id)))
        const pipeline = [
            { $match: { _id: { $in: ids } } },
            { $project: projection },
            ...productRatingPreparingStages()
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

        if (Boolean(withCount)) addFieldsStage.count = getValueAt(1);
        if (Boolean(withPrice)) addFieldsStage.price = getValueAt(2);

        (withCount || withPrice) && pipeline.push({ $addFields: addFieldsStage });

        const products = await ProductsModel.aggregate(pipeline);
        return products;
    } catch (error) {
        console.log(error)
        return null;
    }
}
