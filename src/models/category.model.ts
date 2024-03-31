import { model, Schema } from 'mongoose'
import { CommonParameter } from '../constants'


const {
  schemaOptions, databaseModelNames
} = CommonParameter


const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: databaseModelNames.usersSchema,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: databaseModelNames.usersSchema,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
},
  schemaOptions);

const categoryModel = model(databaseModelNames.categorySchema, categorySchema)

export default categoryModel
