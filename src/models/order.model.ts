import { model, Schema } from 'mongoose'
import { CommonParameter } from '../constants'

const {
  schemaOptions, databaseModelNames, orderStatusSchema
} = CommonParameter

const orderSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: databaseModelNames.usersSchema,
    required: true,
    index: -1
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: databaseModelNames.productSchema,
    required: true,
  }],
  status: {
    type: String,
    default: orderStatusSchema.processing,
    enum: Object.values(orderStatusSchema),
    trim: true,
    uppercase: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },

},
  schemaOptions)

const orderModel = model(databaseModelNames.orderSchema, orderSchema)

export default orderModel