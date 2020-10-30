import mongoose, { Document } from 'mongoose';
import * as types from '../../types';
import { IApartmentDocument } from './Apartment';
import { IUserDocument } from './User';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    buyer: {
      type: ID,
      ref: 'User',
      autopopulate: true,
    },
    apartment: {
      type: ID,
      ref: 'Apartment',
      autopopulate: true,
    },
    startDate: {
      type: Date,
      requred: true,
    },
    endDate: {
      type: Date,
      requred: true,
    },
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

export interface IBooking {
  _id: types.ID | any;
  buyer: IUserDocument | string;
  apartment: IApartmentDocument | string;
  startDate: Date;
  endDate: Date;
}

export interface IBookingDocument extends IBooking, Document {}
export default mongoose.model<IBookingDocument>('Booking', schema);
