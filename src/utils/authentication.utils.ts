import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { CommonParameter } from '../constants';
import EnvVariable from '../config'

const {
    expirationTimeInSeconds
} = CommonParameter

export const passwordEncryption = async (passwordString: string) => {
    return await bcrypt.hash(passwordString, 8)
}

export const passwordCompare = async (passwordString: string, hashString: string) => {

    console.log('Stored Hashed Password:', hashString, 'Length:', hashString.length);

    const result = await bcrypt.compare(passwordString, hashString);
    console.log('Comparison Result:', result);

    return result;
};



export const tokenGeneration = (userID: string, expirationTime?: number, additionalPayloadData?: any) => {
    const expiresIn = expirationTimeInSeconds.oneDay || expirationTime

    const payload: any = { _id: userID, normalToken: true }

    if (additionalPayloadData) {
        payload.other = additionalPayloadData
        payload.normalToken = false
    }

    const jwtToken = jwt.sign(payload, EnvVariable.JWT_SECRET_KEY)

    return {
        expiresIn,
        jwtToken
    }
}

export default {
    passwordEncryption,
    passwordCompare,
    tokenGeneration
}