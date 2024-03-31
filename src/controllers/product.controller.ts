import { Request, Response, NextFunction } from 'express';
import { CommonFunction } from '../utils/index';
import { ProductService } from '../services/index';
import { Messages, CommonParameter } from '../constants/index';


const {
	generalServerSuccessResponse,
	catchAsync,
	convertStringToObjID,
} = CommonFunction


const {
	searchReg,
	httpErrorType
} = CommonParameter


export const commonProductCheck = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const productID = req.params.id || req.body.productID

	const productExist = await ProductService.findOne({
		query: {
			_id: productID,
			isDeleted: false,
		},
		projection: 'title'
	})

	if (!productExist) {
		throw {
			...httpErrorType.badRequest,
			message: Messages.product.notExist
		}
	}

	res.locals.productExist = productExist

	next()
})

export const createNewOne = catchAsync(async (req: any, res: Response, next: NextFunction) => {
	const preProcessingData = req.body
	const userData = res.locals.user
	preProcessingData.createdBy = userData._id;

	await ProductService.createNewOne(preProcessingData)

	return generalServerSuccessResponse({
		message: preProcessingData.title + Messages.product.success.created
	}, req, res)
})

export const webAppListByCategory = catchAsync(async (req: any, res: Response, next: NextFunction) => {
	const { search, page, limit, sort, categoryId } = req.query;

	const dbQuery: any = {
		$and: [
			{ $eq: ['$isDeleted', false] },
			{ $eq: ['$category', convertStringToObjID(categoryId)] }
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

	if (search && search.length > 0) {
		const searchRegex = new RegExp(search.replace(searchReg.FIRST, searchReg.SECOND), searchReg.THIRD);
		dbSubQuery.$or.push({ $regexMatch: { input: '$title', regex: searchRegex } })
		dbSubQuery.$or.push({ $regexMatch: { input: '$description', regex: searchRegex } })
	}

	const result = await ProductService.webAppListing({
		...req.query,
		query: dbQuery,
		searchQuery: dbSubQuery
	});

	return generalServerSuccessResponse({
		data: result
	}, req, res);
});


export const findById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const productId = req.params.id
	const result = await ProductService.findOne({
		query: {
			isDeleted: false,
			category: productId
		},
		projection: 'name description category price'
	})

	return generalServerSuccessResponse({
		data: result
	}, req, res)
})



export default {
	createNewOne,
	webAppListByCategory,
	findById,
	commonProductCheck
}
