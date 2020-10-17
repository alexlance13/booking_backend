import mongoose, { Document } from 'mongoose';
import * as types from '../../types';
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
    roomsCount: {
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

export interface IApartment{
  _id: types.ID;
  name: string;
  description: string;
  image: string;
  price: Number;
  roomsCount: Number;
  seller: IUser;
}

export interface IApartmentDocument extends Document{}
export default mongoose.model<IApartmentDocument>('Apartment', schema);
