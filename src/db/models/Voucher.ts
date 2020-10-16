import mongoose, { Document } from 'mongoose';
import { Variant } from '../../types';
import { IUser } from './User';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
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
      enum: Object.keys(Variant),
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
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

export interface IVoucher {
  name: String;
  description: String;
  image: String;
  price: Number;
  variant: Variant;
  quantity: Number;
  seller: IUser;
}
export interface IVoucherDocument extends Document{}
export default mongoose.model<IVoucherDocument>('Voucher', schema);
