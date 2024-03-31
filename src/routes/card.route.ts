import { Router } from 'express';
import { CardController } from '../controllers/index';
import { RoutePath } from '../constants/index';
import { AuthMiddleware } from '../middlewares/index';
import { CardValidator } from '../joi-validator/index';

const { cardRoute } = RoutePath;
const router = Router();

import { JoiValidator } from '../utils/index';
const schemaValidator = JoiValidator.validator;

router.post(
    cardRoute.addToCart,
    AuthMiddleware,
    schemaValidator.body(CardValidator.createNewOne),
    CardController.addToCart
);

router.get(
    cardRoute.viewCart,
    AuthMiddleware,
    CardController.viewCart
);

router.put(
    cardRoute.updateCartItem,
    AuthMiddleware,
    schemaValidator.body(CardValidator.updateOne),
    CardController.updateCartItem
);

router.delete(
    cardRoute.removeCartItem,
    AuthMiddleware,
    CardController.removeCartItem
);

export default {
    mainRouter: router,
    path: cardRoute.root,
};
