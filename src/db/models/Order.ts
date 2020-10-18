import mongoose, { Document } from 'mongoose';
import * as types from '../../types';
import { IUserDocument } from './User';
import { IVoucherDocument } from './Voucher';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    buyer: {
      type: ID,
      ref: 'User',
      autopopulate: true,
    },
    voucher: {
      type: ID,
      ref: 'Voucher',
      autopopulate: true,
    },
    quantity: {
      type: Number,
      requred: true,
    },
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

export interface IOrder {
  _id: types.ID | any;
  buyer: IUserDocument | string;
  voucher: IVoucherDocument | string;
  quantity: Number;
}

export interface IOrderDocument extends IOrder, Document{}
export default mongoose.model<IOrderDocument>('Order', schema);
