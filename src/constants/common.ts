export const databaseModelNames = {
    usersSchema: 'user',
    productSchema: 'product',
    orderSchema: 'order',
    categorySchema: 'category',
    cardSchema: 'card'
}

export const schemaOptions = {
    versionKey: false,
    timestamps: {

        createdAt: true,
        updateAt: 'modifiedAt',
    }
}

export const defaultListingParameter = {
    query: {},
    andQuery: { $and: [] },
    orQuery: { $or: [] },
    projection: '',
    skip: 0,
    sort: '-_id',
    sortObj: {
        _id: -1
    },
    limit: 10,
    population: '',
    populationArray: [],
    page: 1
};
export const searchReg = {
    FIRST: /[-\/\\^$*+?.()|[\]{}]/g,
    SECOND: '\\$&',
    THIRD: 'ig'
}

export const httpErrorType = {
    internalServerError: {
        code: 500,
        message: 'Something went wrong, please try again later',
        errorType: 'InternalServerError'
    },
    badRequest: {
        code: 400,
        message: 'Something is missing in request, please check your request.',
        errorType: 'BadRequest'
    },
    unauthorized: {
        code: 401,
        message: 'You are not authenticated, please login again.',
        errorType: 'Unauthorized'
    },
    forbidden: {
        code: 403,
        message: 'You are not authorized to access this route.',
        errorType: 'Unauthorized'
    }
}



export const defaultErrorObject = {
    code: 400,
    message: '',
    errorType: ''
};

export const generalServerResponse = {
    code: 200,
    status: 'Success',
    message: '',
    data: {}
}

export const taskCommentType = {
    text: 'TEXT',
    image: 'IMAGE',
};




export const defaultTaskEndTimeAndDate = {
    endUTCHours: 23,
    endUTCMinutes: 59,
    endUTCSeconds: 59
}

export const expirationTimeInSeconds = {
    oneDay: 86400,
    thirtyDays: (86400 * 30),
    ninetyDays: (86400 * 90)
}

export const defaultStatic = {
    password: 'infi@111'
}

export const userLoginAttemptAllowedThreshold = {
    default: 0,
    minimum: 0,
    maximum: 5
}

export const orderStatusSchema = {
    processing: 'PROCESSING',
    shipped: 'SHIPPED',
    delivered: 'DELIVERED',
}

export default {
    databaseModelNames,
    schemaOptions,
    defaultListingParameter,
    searchReg,
    httpErrorType,
    defaultErrorObject,
    generalServerResponse,
    taskCommentType,
    defaultTaskEndTimeAndDate,
    expirationTimeInSeconds,
    defaultStatic,
    userLoginAttemptAllowedThreshold,
    orderStatusSchema
}
