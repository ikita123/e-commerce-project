import { Response, NextFunction } from 'express';
import { CommonFunction } from '../utils/index';
import { CommonParameter, Messages } from '../constants/index';
import { CategoryService } from '../services/index';

const {
    generalServerSuccessResponse,
    catchAsync,
} = CommonFunction


const {
    searchReg,
} = CommonParameter


export const createNewOne = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const preProcessingData = req.body
    const userData = res.locals.user
    preProcessingData.createdBy = userData._id;

    await CategoryService.createNewOne(preProcessingData)

    return generalServerSuccessResponse({
        message: preProcessingData.name + Messages.category.success.created
    }, req, res)
})

export const webAppList = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const { page, limit, sort } = req.query;
    const dbQuery: any = {
        $and: [
            { $eq: ['$isDeleted', false] },
        ]
    };

    const dbSubQuery: any = { $or: [] };
    req.query.skip = (page - 1) * limit;

    if (sort && sort.length > 0) {
        const sortSplit: string[] = sort.split('-');
        req.query.sort = {};
        req.query.sort[sortSplit[1] || sortSplit[0]] = sortSplit.length > 1 ? -1 : 1;
        req.query.sort._id = -1;
    }

    const result = await CategoryService.webAppListing({
        ...req.query,
        query: dbQuery,
        searchQuery: dbSubQuery
    });

    return generalServerSuccessResponse({
        data: result
    }, req, res);
});





export default {
    webAppList,
    createNewOne
}
