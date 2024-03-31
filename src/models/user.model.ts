import { model, Schema } from 'mongoose'
import { CommonParameter } from '../constants'

const {
  schemaOptions, databaseModelNames,
} = CommonParameter

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
    index: 'text'
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
    index: 'text'
  },
  profilePic: {
    type: Object,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: 'text'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    default: null,
    trim: true,
    select: false,
    required: true

  },
  entityFreezed: {
    type: Boolean,
    default: false,
    select: false
  },
},
  schemaOptions)

const userModel = model(databaseModelNames.usersSchema, userSchema)

export default userModel