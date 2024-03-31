import Joi from "joi";
import { Messages, CommonParameter } from "../constants/index";

const { joi } = Messages;
const { defaultListingParameter } = CommonParameter;

export const listingQuery = Joi.object({
    sort: Joi.string().trim().default(defaultListingParameter.sort).regex(/^[-_. a-zA-Z]+$/).messages(joi),
    limit: Joi.number().integer().min(1).max(1000).default(defaultListingParameter.limit).messages(joi),
    page: Joi.number().integer().min(1).default(defaultListingParameter.page).messages(joi),
    search: Joi.string().trim().allow(null, '').messages(joi)
}).unknown(true)

export const paramsID = Joi.object({
    id: Joi.string().trim().lowercase().required().messages(joi),
}).unknown(true)

export const getPreSignedURL = Joi.object({
    fileName: Joi.string().trim().required().messages(joi),
    fileType: Joi.string().trim().required().messages(joi)
})

export default {
    listingQuery,
    paramsID,
    getPreSignedURL
}