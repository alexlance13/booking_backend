import mongoose, { Document } from 'mongoose';
import { IApartment } from './Apartment';
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
      type: String,
      requred: true,
    },
    dateEnd: {
      type: String,
      requred: true,
    },
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

export interface IBooking {
  buyer: IUser;
  apartment: IApartment;
  dateStart: String;
  dateEnd: String;
}

export interface IBookingDocument extends Document{}
export default mongoose.model<IBookingDocument>('Booking', schema);
