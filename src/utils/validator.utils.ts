import {
    createValidator
} from 'express-joi-validation'

export const validator = createValidator({ passError: true })

export default {
    validator
}
