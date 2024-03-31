import { model, Schema } from 'mongoose'
import { CommonParameter } from '../constants'

const {
  schemaOptions, databaseModelNames, orderStatusSchema
} = CommonParameter

const cardSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: databaseModelNames.usersSchema,
    required: true,
    index: -1
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: databaseModelNames.productSchema,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false
  },

},

  schemaOptions)

const cardModel = model(databaseModelNames.cardSchema, cardSchema)

export default cardModel