import { Router } from 'express';
import { UserController } from '../controllers';
import { RoutePath } from '../constants';
import { AuthenticationValidator } from '../joi-validator';
import { JoiValidator } from '../utils';

const { userRoute } = RoutePath;
const router = Router();
const schemaValidator = JoiValidator.validator;

router.post(
    userRoute.register,
    schemaValidator.body(AuthenticationValidator.createNewOne),
    UserController.registerController
);

router.post(
    userRoute.login,
    schemaValidator.body(AuthenticationValidator.webAppLogin),
    UserController.loginController
);

export default {
    mainRouter: router,
    path: userRoute.root,
};