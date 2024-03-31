import Joi from 'joi';

import { Messages } from "../constants/index";

const AuthenticationMessage = Messages.joiMessage.webAppLogin
const { joi } = Messages;

export const webAppLogin = Joi.object({
    email: Joi.string().trim().required().messages(joi),
    password: Joi.string().trim().required().messages(joi),
})

export const createNewOne = Joi.object({
    email: Joi.string().trim().required().messages(joi),
    firstName: Joi.string().trim().required().messages(joi),
    lastName: Joi.string().trim().required().messages(joi),
    password: Joi.string().trim().required().messages(joi),
})


export default {
    webAppLogin,
    createNewOne
}
