import { Request, Response, NextFunction } from 'express';
import { CommonFunction, AuthUtils } from '../utils/index';
import { Messages, CommonParameter } from '../constants/index';
import { CardService } from '../services/index';

const {
    generalServerSuccessResponse,
    catchAsync,
    convertStringToObjID,
} = CommonFunction


const {
    httpErrorType,
    searchReg,
} = CommonParameter



export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    const preProcessingData = req.body
    const userData = res.locals.user
    preProcessingData.createdBy = userData._id;

    await CardService.createNewOne(preProcessingData)
    return generalServerSuccessResponse({
        message: Messages.card.success.created
    }, req, res)
};


export const viewCart = catchAsync(async (req: any, res: Response, next: NextFunction) => {

    const { userId } = req.query;
    const dbQuery: any = {
        $and: [
            { $eq: ['$isDeleted', false] },
            { $eq: ['$user', convertStringToObjID(userId)] }

        ]
    };

    const result = await CardService.findCard({
        ...req.query,
        query: dbQuery,
    });

    return generalServerSuccessResponse({
        data: result
    }, req, res);
});

export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
    const preProcessingData = req.body
    const query = { user: preProcessingData.userId, 'items.product': preProcessingData.productId };
    const dataToUpdate = { 'items.$.quantity': preProcessingData.quantity };
    await CardService.updateOne({ query, dataToUpdate });
    return generalServerSuccessResponse({
        message: Messages.card.success.updated
    }, req, res);
};

export const removeCartItem = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, productId } = req.body;
    const query = { user: convertStringToObjID(userId) };
    const updateOperation = {
        $pull: { items: { product: convertStringToObjID(productId) } }
    };
    await CardService.updateOne({ query, dataToUpdate: updateOperation });
    return generalServerSuccessResponse({
        message: Messages.card.success.deleted
    }, req, res);
};


export default {
    addToCart,
    viewCart,
    updateCartItem,
    removeCartItem
}
