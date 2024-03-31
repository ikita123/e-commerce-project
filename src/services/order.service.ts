import { OrderModel } from "../models/index";
import { CommonParameter } from '../constants'

const {
    defaultListingParameter
} = CommonParameter

export const placeNewOne = async (inputData: any) => {
    return await OrderModel.create(inputData)
}

interface PopulationItem {
    path: string;
    select?: string;
}

export const findOne = async ({
    query = defaultListingParameter.query,
    projection = defaultListingParameter.projection,
    population = defaultListingParameter.population,
    populationArray = [] as PopulationItem[]
}) => {
    return await OrderModel.findOne(query, projection)
        .populate(population)
        .populate(populationArray)
        .lean();
};

export const webAppListing = async ({
    query = defaultListingParameter.query,
    skip = defaultListingParameter.skip,
    limit = defaultListingParameter.limit,
    sort = defaultListingParameter.sortObj,
    searchQuery = defaultListingParameter.orQuery
}) => {
    const listFindPipeline: any[] = [
        {
            $match: {
                $expr: query
            }
        },
        {
            $match: (searchQuery.$or.length > 0 ? {
                $expr: searchQuery
            } : {})
        },
        {
            $lookup: {
                from: "products",
                localField: "products",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $facet: {
                records: [
                    {
                        $count: "totalResult"
                    },
                    {
                        $set: {
                            totalResult: {
                                $ifNull: ["$totalResult", 0]
                            }
                        }
                    }
                ],
                list: [
                    {
                        $sort: sort
                    },
                    {
                        $skip: Number(skip)
                    },
                    {
                        $limit: Number(limit)
                    }
                ]
            }
        },
        {
            $set: {
                records: {
                    $cond: [
                        { $ne: [{ $size: "$records" }, 0] },
                        { $arrayElemAt: ["$records.totalResult", 0] },
                        0
                    ]
                }
            }
        }
    ];

    const orderList: any[] = await OrderModel.aggregate(listFindPipeline);

    return orderList[0];
}


export default {
    placeNewOne,
    webAppListing,
    findOne
};
