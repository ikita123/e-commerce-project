import Joi from 'joi';

import { Messages } from "../constants/index";

const { joi } = Messages;

export const createNewOne = Joi.object({
    title: Joi.string().trim().required().messages(joi),
    description: Joi.string().trim().required().messages(joi),
    category: Joi.string().trim().required().messages(joi),
    price: Joi.number().required().messages(joi),
    quantity: Joi.number().required().messages(joi),
})

export const updateOne = Joi.object({
    title: Joi.string().trim().required().messages(joi),
    description: Joi.string().trim().required().messages(joi),
    category: Joi.string().trim().required().messages(joi),
    price: Joi.number().required().messages(joi),
    quantity: Joi.number().required().messages(joi),
    productID: Joi.string().trim().lowercase().alphanum().required().messages(joi),

})

export default {
    createNewOne,
    updateOne
}