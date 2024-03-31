import { CommonParameter } from '../constants'
import { CardModel } from '../models/index'
const {
  defaultListingParameter
} = CommonParameter

export const createNewOne = async (inputData: any) => {
  return await CardModel.create(inputData)
}

export const updateOne = async ({ query = defaultListingParameter.query, dataToUpdate = {}, options = { new: true } }) => {
  return await CardModel.findOneAndUpdate(query, { $set: { updatedAt: new Date() }, ...dataToUpdate }, options);
};


export const deleteOne = async ({ query = defaultListingParameter.query }) => {
  return await CardModel.deleteOne(query)
}


export const findCard = async ({
  query = defaultListingParameter.query,
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
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'productDetails',
      }
    },
    {
      $addFields: {
        items: {
          $map: {
            input: '$items',
            as: 'item',
            in: {
              _id: '$$item._id',
              quantity: '$$item.quantity',
              product: {
                $arrayElemAt: [
                  '$productDetails',
                  {
                    $indexOfArray: ['$productDetails._id', '$$item.product']
                  }
                ]
              }
            }
          }
        }
      }
    },
    {
      $unset: 'productDetails'
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

  const cardList: any[] = await CardModel.aggregate(listFindPipeline)

  return cardList[0]
}


export default {
  createNewOne,
  updateOne,
  deleteOne,
  findCard
};
