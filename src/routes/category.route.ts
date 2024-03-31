import { Router } from 'express';
import { RoutePath } from '../constants/index';
import { AuthMiddleware } from '../middlewares/index';
import { JoiValidator } from '../utils/index';
import { CategoryController } from '../controllers/index';
import { CategoryValidator } from '../joi-validator/index';
const { categoryRoute } = RoutePath;
const router = Router();
const schemaValidator = JoiValidator.validator;

router.post(
    categoryRoute.createNewOne,
    AuthMiddleware,
    schemaValidator.body(CategoryValidator.createNewOne),
    CategoryController.createNewOne
);

router.get(
    categoryRoute.webAppList,
    AuthMiddleware,
    CategoryController.webAppList
);


export default {
    mainRouter: router,
    path: categoryRoute.root,
};
