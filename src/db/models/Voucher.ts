import mongoose, { Document, Model } from 'mongoose';
import * as types from '../../types';
import filterable from '../trades/filterable';
import sortable from '../trades/sortable';
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

schema.statics.getFilters = function getFilters(query): any {
  return {
    variant: (arg: string): any => query.where('variant').equals(arg),
  };
};

filterable(schema);
sortable(schema);

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

export interface IVoucherModel extends Model<IVoucherDocument> {
  getFilters(query: any): any;
  filterBy(query: any, filter: string, value: any): any;
  sortBy(query: any, sort: string, value: any): any;
}

export default mongoose.model<IVoucherDocument, IVoucherModel>('Voucher', schema);
