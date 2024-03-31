import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { CommonParameter } from '../constants'

const {
    generalServerResponse
} = CommonParameter;



export const generalServerSuccessResponse = (sendResponse: any = generalServerResponse, req: Request, res: Response) => {
    return res.json({
        status: sendResponse.status || generalServerResponse.status,
        message: sendResponse.message || generalServerResponse.message,
        data: sendResponse.data || generalServerResponse.data
    })
}

export const newObjectIDGenerator = () => {
    return new mongoose.Types.ObjectId();
}


export const catchAsync = (fun: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fun(req, res, next).catch(next)
    }
}
export const convertStringToObjID = (id: string) => {
    return new mongoose.Types.ObjectId(id);
}

export default {
    generalServerSuccessResponse,
    newObjectIDGenerator,
    catchAsync,
    convertStringToObjID
}