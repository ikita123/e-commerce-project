import { CategoryModel } from "../models/index";
import { CommonParameter } from '../constants'

const {
    defaultListingParameter
} = CommonParameter

export const createNewOne = async (inputData: any) => {
    return await CategoryModel.create(inputData)
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
                        { $ne: [ { $size: "$records" }, 0 ] },
                        { $arrayElemAt: [ "$records.totalResult", 0 ] },
                        0
                    ]
                }
            }
        }
    ]
  
    const categoryList: any[] = await CategoryModel.aggregate(listFindPipeline)
  
    return categoryList[0]
  }


export default {
  webAppListing,
  createNewOne
};
