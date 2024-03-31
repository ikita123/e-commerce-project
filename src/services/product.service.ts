import { ProductModel } from "../models/index";
import { CommonParameter } from '../constants'

const {
    defaultListingParameter
} = CommonParameter

export const createNewOne = async (inputData: any) => {
    return await ProductModel.create(inputData)
}
export const findList = async ({
    query = defaultListingParameter.query,
    projection = defaultListingParameter.projection,
    sort = defaultListingParameter.sort,
    skip = defaultListingParameter.skip,
    limit = defaultListingParameter.limit,
    population = []
}) => {
    return await ProductModel.find(query, projection).sort(sort)
        .skip(skip).limit(limit).populate(population).lean()
}

export const updateOne = async ({ query = defaultListingParameter.query, dataToUpdate = {}, options = { new: true } }) => {
    return await ProductModel.findOneAndUpdate(query, { $set: dataToUpdate }, options)
}

export const deleteOne = async ({ query = defaultListingParameter.query }) => {
    return await ProductModel.deleteOne(query)
}

export const findOne = async ({ query = defaultListingParameter.query,
    projection = defaultListingParameter.projection, population = defaultListingParameter.populationArray }) => {
    return await ProductModel.findOne(query, projection).populate(population).lean()
}

export const itemCount = async ({ query = defaultListingParameter.query }) => {
    return await ProductModel.find(query).countDocuments()
}

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
                from: 'reviews',
                let: {
                    id: '$_id',
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$productId', '$$id'],
                            },
                        },
                    },
                    {
                        $project: {
                            rating: 1,
                            comment: 1,

                        }
                    }
                ],
                as: 'review',
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
    ]

    const productList: any[] = await ProductModel.aggregate(listFindPipeline)

    return productList[0]
}


export default {
    createNewOne,
    findList,
    updateOne,
    deleteOne,
    findOne,
    itemCount,
    webAppListing
};
