import { Request, Response, NextFunction } from 'express';
import { CommonFunction, AuthUtils } from '../utils/index';
import { UserService } from '../services/index';
import { Messages, CommonParameter } from '../constants/index';


const {
    generalServerSuccessResponse,
    catchAsync,
} = CommonFunction


const {
    tokenGeneration,
    passwordCompare
} = AuthUtils

const {
    httpErrorType,
} = CommonParameter



export const registerController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const preProcessingData = req.body;

        const userExist = await UserService.findOneUser({ query: { email: preProcessingData.email } });
        if (userExist) {
            return res.status(400).json({ message: Messages.user.rejected.emailExist });
        }

        const enteredPassword = preProcessingData.password.trim();
        const hashedPassword = await AuthUtils.passwordEncryption(enteredPassword);

        await UserService.registerNewUser({ ...preProcessingData, password: hashedPassword });

        return res.status(201).json({ message: preProcessingData.firstName + Messages.user.success.created });
    } catch (error) {
        next(error);
    }
});

export const loginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const preProcessingData = req.body;
        const userInformation = await UserService.findOneUser({
            query: { email: preProcessingData.email },
            projection: '+password +isDeleted',
        });

        if (!userInformation) {
            return res.status(400).json({ message: Messages.authentication.rejected.invalidCredentials });
        }

        const enteredPassword = preProcessingData.password.trim();
        const passwordCorrect = await passwordCompare(enteredPassword, String(userInformation.password));

        if (!passwordCorrect) {
            return res.status(400).json({ message: Messages.authentication.rejected.invalidCredentials });
        }

        const userID = String(userInformation._id);
        const { expiresIn, jwtToken } = tokenGeneration(userID);

        return res.status(200).json({
            message: Messages.authentication.success.loggedIn,
            data: {
                token: jwtToken,
                expiresIn,
                userInformation,
            }
        });
    } catch (error) {
        next(error);
    }
});



export default {
    registerController,
    loginController,
}