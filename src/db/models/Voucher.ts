import mongoose, { Document, Model } from 'mongoose';
import * as types from '../../types';
import { SortType, Variant } from '../../types/enums';
import filterable from '../traits/filterable';
import sortable from '../traits/sortable';
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
    orders: [{ type: ID, ref: 'Order', autopopulate: true }],
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

schema.statics.getFilters = function getFilters(query: types.VoucherQuery): types.IFilters {
  return {
    variant: (arg: string): types.VoucherQuery => query.where('variant').equals(arg),
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
  variant: Variant;
  quantity: number;
  seller: IUserDocument;
  orders: IOrderDocument[];
}

export interface IVoucherDocument extends IVoucher, Document {}

export interface IVoucherModel extends Model<IVoucherDocument> {
  getFilters(query: types.VoucherQuery): types.VoucherQuery;
  filterBy(query: types.VoucherQuery, filter: string, value: SortType): types.VoucherQuery;
  sortBy(query: types.VoucherQuery, sort: string, value: SortType): types.VoucherQuery;
}

export default mongoose.model<IVoucherDocument, IVoucherModel>('Voucher', schema);
