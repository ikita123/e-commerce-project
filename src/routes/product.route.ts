import { Router } from 'express';
import { ProductController } from '../controllers/index';
import { RoutePath } from '../constants/index';
import { JoiValidator } from '../utils/index';
import { CommonValidator } from '../joi-validator/index';
import { ProductValidator } from '../joi-validator/index';
import { AuthMiddleware } from '../middlewares/index';
const { productRoute } = RoutePath;
const router = Router();

const schemaValidator = JoiValidator.validator;

router.get(
  productRoute.webAppList,
  AuthMiddleware,
  ProductController.webAppListByCategory
);

router.post(
  productRoute.createNewOne,
  AuthMiddleware,
  schemaValidator.body(ProductValidator.createNewOne),
  ProductController.createNewOne
);

router.get(
  productRoute.findOne,
  AuthMiddleware,
  schemaValidator.params(CommonValidator.paramsID),
  ProductController.commonProductCheck,
  ProductController.findById
);


export default {
  mainRouter: router,
  path: productRoute.root,
};
