import mongoose, { Document } from 'mongoose';
import * as types from '../../types';
import { IApartment, IApartmentDocument } from './Apartment';
import { IUser } from './User';

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
    dateStart: {
      type: Date,
      requred: true,
    },
    dateEnd: {
      type: Date,
      requred: true,
    },
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

export interface IBooking {
  _id: types.ID;
  buyer: IUser;
  apartment: IApartment;
  dateStart: Date;
  dateEnd: Date;
}

export interface IBookingDocument extends Document{
  apartment: IApartmentDocument;
}
export default mongoose.model<IBookingDocument>('Booking', schema);
