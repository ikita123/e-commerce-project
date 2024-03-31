import Joi from 'joi';
import { Messages } from "../constants/index";

const { joi } = Messages;

export const createNewOne = Joi.object({
    name: Joi.string().trim().required().messages(joi),
    description: Joi.string().trim().required().messages(joi),
});

export default {
    createNewOne
};