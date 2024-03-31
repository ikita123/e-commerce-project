import Joi from 'joi';

import { Messages } from "../constants/index";

const { joi } = Messages;

export const createNewOne = Joi.object({
    products: Joi.array().items(
        Joi.string().trim().lowercase().alphanum().required().messages(joi)
    ).required().messages(joi),
    user: Joi.string().trim().lowercase().alphanum().required().messages(joi)
})

export default {
    createNewOne
}