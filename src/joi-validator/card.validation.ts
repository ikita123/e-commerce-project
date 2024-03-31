import Joi from 'joi';
import { Messages } from "../constants/index";

const { joi } = Messages;

export const createNewOne = Joi.object({
    user: Joi.string().trim().lowercase().alphanum().required().messages(joi),
    items: Joi.array().items(
        Joi.object({
            product: Joi.string().trim().lowercase().alphanum().required().messages(joi),
            quantity: Joi.number().integer().min(1).required().messages(joi)
        })
    ).required().messages(joi)
});

export const updateOne = Joi.object({
    userId: Joi.string().trim().alphanum().required().messages(joi),
    productId: Joi.string().trim().alphanum().required().messages(joi),
    quantity: Joi.number().integer().min(1).required().messages(joi)
});

export default {
    createNewOne,
    updateOne
};
