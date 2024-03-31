import { UserModel } from "../models/index";
import { CommonParameter } from '../constants'

const {
    defaultListingParameter
} = CommonParameter

export const registerNewUser = async (userData: any) => {
    return await UserModel.create(userData);
};

export const findOneUser = async ({ query = defaultListingParameter.query,
    projection = defaultListingParameter.projection ,  population = []}) => {
    return await UserModel.findOne(query, projection).populate(population).lean();
};

export default {
    registerNewUser,
    findOneUser
  };