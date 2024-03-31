import { Request, Response, NextFunction } from 'express';
import { CommonFunction } from '../utils/index';
import { Messages, CommonParameter } from '../constants/index';
import { OrderService } from '../services/index';

const {
	generalServerSuccessResponse,
	catchAsync,
	convertStringToObjID,
} = CommonFunction


const {
	httpErrorType,
	searchReg,
} = CommonParameter


export const commonOrderCheck = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const orderID = req.params.id || req.body.orderID

	const orderExist = await OrderService.findOne({
		query: {
			_id: orderID,
			isDeleted: false,
		},
		projection: 'name'
	})

	if (!orderExist) {
		throw {
			...httpErrorType.badRequest,
			message: Messages.order.notExist
		}
	}

	res.locals.orderExist = orderExist

	next()
})


export const createNewOne = catchAsync(async (req: any, res: Response, next: NextFunction) => {
	const preProcessingData = req.body
	const userData = res.locals.user

	preProcessingData.createdBy = userData._id;

	await OrderService.placeNewOne(preProcessingData)

	return generalServerSuccessResponse({
		message: Messages.order.success.created
	}, req, res)
})

export const webAppList = catchAsync(async (req: any, res: Response, next: NextFunction) => {
	const userData = res.locals.user;
	const { search, page, limit, sort } = req.query;
	const listOfFilters = ['status'];

	const dbQuery: any = {
		$and: [
			{ $eq: ['$isDeleted', false] },
			{ $eq: ['$user', convertStringToObjID(userData._id)] }
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

	listOfFilters.forEach((filter: string) => {
		if (!req.query[filter] || (req.query[filter] && req.query[filter].length == 0)) return;
		const items: string[] = req.query[filter].split(',')
		const filterSubQuery: any = { $or: [] };

		if (filter === 'status') {
			items.forEach((val: string) => filterSubQuery.$or.push({ $eq: [`$${filter}`, val.trim()] }))
		}

		dbQuery.$and.push(filterSubQuery)

	})

	if (search && search.length > 0) {
		const searchRegex = new RegExp(search.replace(searchReg.FIRST, searchReg.SECOND), searchReg.THIRD);
		dbSubQuery.$or.push({ $regexMatch: { input: '$status', regex: searchRegex } })
	}

	const result = await OrderService.webAppListing({
		...req.query,
		query: dbQuery,
		searchQuery: dbSubQuery
	});

	return generalServerSuccessResponse({
		data: result
	}, req, res);
});

export const findOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const orderID = req.params.id;

	const query = {
		isDeleted: false,
		_id: orderID
	};

	const populationArray = [
		{
			path: 'products',
			select: 'title'
		},
	]


	const result = await OrderService.findOne({
		query,
		populationArray
	});

	return generalServerSuccessResponse({
		data: result
	}, req, res);
});



export default {
	commonOrderCheck,
	createNewOne,
	webAppList,
	findOne
}
