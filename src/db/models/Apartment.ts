/* eslint-disable no-param-reassign */
// @ts-nocheck
import mongoose, { Document, Model } from 'mongoose';
import * as models from './index';
import * as types from '../../types';
import { IBookingDocument } from './booking';
import { IUserDocument } from './User';
import sortable from '../trades/sortable';
import filterable from '../trades/filterable';
import isDateBetween from '../../helpers/date.helper';

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
    roomsCount: {
      type: Number,
      required: true,
    },
    seller: {
      type: ID,
      ref: 'User',
      autopopulate: true,
    },
    bookings: [{ type: ID, ref: 'Booking', autopopulate: true }],
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

schema.statics.getSorts = function getSorts(query): any {
  return {
    sortByRooms: (arg: string): any => query.sort(`${arg === 'desc' ? '-' : ''}roomsCount`),
    // availableDates: async (arg: string): Promise<any> => {}, // todo logic
    availableDates: async (arg: string): Promise<any> => {
      const apartments = await models.apartment.find();
      const minBooking = (a) => a.bookings.reduce((min, b) => {
        if (b.startDate < min.startDate) {
          return b;
        }
        if (b.startDate === min.startDate && b.endDate < min.endDate) {
          return b;
        }
        return min;
      }, a.bookings[0]);

      apartments.forEach((apartment) => apartment.bookings.forEach((booking) => {
        booking.startDate = Date.parse(booking.startDate);
        booking.endDate = Date.parse(booking.endDate);
      }));

      const sorted = apartments.sort((a, b) => {
        if (!a.bookings.length && !b.bookings.length) {
          return 0;
        }
        if (!a.bookings.length) {
          return -1;
        }
        if (!b.bookings.length) {
          return 1;
        }
        const aMinBooking = minBooking(a);
        const bMinBooking = minBooking(b);
        if (aMinBooking.startDate < bMinBooking.startDate) {
          return -1;
        }
        if (aMinBooking.startDate === bMinBooking.startDate) {
          if (aMinBooking.endDate < bMinBooking.endDate) {
            return -1;
          } if (aMinBooking.endDate === bMinBooking.endDate) {
            return 0;
          }
          return 1;
        }
        if (aMinBooking.startDate > bMinBooking.startDate) {
          return 1;
        }
      });
      query.map((docs) => docs.map((el, i) => {
        console.log(i);
        el = sorted[i];
        return el;
      }));
      // console.log(query);
      return query;
    },
  };
};

schema.statics.getFilters = function getFilters(query): any {
  return {
    rooms: (arg: string): any => query.where('roomsCount').equals(+arg),
    startDate: async (searchParams: types.ISearchParams): Promise<any> => {
      const newQuery = await models.apartment.find();
      const filteredIDs = newQuery.map((doc: IApartmentDocument) => {
        const some = doc.bookings.some(
          (docBooking) => isDateBetween(docBooking.startDate, docBooking.endDate, searchParams.startDate)
            || isDateBetween(docBooking.startDate, docBooking.endDate, searchParams.endDate)
            || isDateBetween(searchParams.startDate, searchParams.endDate, docBooking.startDate)
            || isDateBetween(searchParams.startDate, searchParams.endDate, docBooking.endDate),
        );
        return !some ? doc._id : undefined;
      });
      query.where('_id').in(filteredIDs);
    },
  };
};

sortable(schema);
filterable(schema);

export interface IApartment {
  _id: types.ID | any;
  name: string;
  description: string;
  image: string;
  price: number;
  roomsCount: number;
  seller: IUserDocument;
  bookings: IBookingDocument[];
}

export interface IApartmentDocument extends IApartment, Document {}

export interface IApartmentModel extends Model<IApartmentDocument> {
  getSorts(query: any): any;
  sortBy(query: any, sort: string, value: any): any;
  getFilters(query: any): any;
  filterBy(query: any, filter: string, value: any): any;
}
export default mongoose.model<IApartmentDocument, IApartmentModel>('Apartment', schema);
