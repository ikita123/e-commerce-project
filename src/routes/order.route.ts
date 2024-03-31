import { Router } from 'express';
import { OrderController } from '../controllers/index';
import { RoutePath } from '../constants/index';
import { AuthMiddleware } from '../middlewares/index';
import { OrderValidator } from '../joi-validator/index';
import { CommonValidator } from '../joi-validator/index';
const { orderRoute } = RoutePath;
const router = Router();
import { JoiValidator } from '../utils/index';

const schemaValidator = JoiValidator.validator;

router.get(
    orderRoute.webAppList,
    AuthMiddleware,
    OrderController.webAppList
);

router.post(
    orderRoute.placeOrder,
    AuthMiddleware,
    schemaValidator.body(OrderValidator.createNewOne),
    OrderController.createNewOne
);

router.get(
    orderRoute.findOne,
    AuthMiddleware,
    schemaValidator.params(CommonValidator.paramsID),
    OrderController.commonOrderCheck,
    OrderController.findOne
);

export default {
    mainRouter: router,
    path: orderRoute.root,
};
