import mongoose, { Document } from 'mongoose';
import * as types from '../../types';
import { IOrderDocument } from './Order';
import { IUserDocument } from './User';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 800,
    },
    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    variant: {
      type: String,
      enum: Object.keys(types.Variant),
    },
    quantity: {
      type: Number,
      required: true,
    },

    seller: {
      type: ID,
      ref: 'User',
      autopopulate: true,
    },
    orders: [{ type: ID, ref: 'Order', autopopulate: true }],
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

export interface IVoucher {
  _id: types.ID | any;
  name: string;
  description: string;
  image: string;
  price: number;
  variant: types.Variant;
  quantity: number;
  seller: IUserDocument;
  orders: IOrderDocument[];
}
export interface IVoucherDocument extends IVoucher, Document {}
export default mongoose.model<IVoucherDocument>('Voucher', schema);
