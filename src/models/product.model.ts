import { model, Schema } from 'mongoose'
import { CommonParameter } from '../constants'

const {
  schemaOptions, databaseModelNames
} = CommonParameter

const productSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: 'text'
  },
  description: {
    type: String,
    required: true,
    trim: true,
    index: 'text'
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: databaseModelNames.categorySchema
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: databaseModelNames.usersSchema,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: databaseModelNames.usersSchema,
  },
},
  schemaOptions)

const productModel = model(databaseModelNames.productSchema, productSchema)

export default productModel
