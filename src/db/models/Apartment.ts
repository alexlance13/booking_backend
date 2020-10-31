import mongoose, { Document, Model } from 'mongoose';
import * as models from './index';
import * as types from '../../types';
import { IBookingDocument } from './Booking';
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

schema.statics.getSorts = function getSorts(query: types.ApartmentQuery): any {
  return {
    sortByRooms: (arg: string): types.ApartmentQuery => query.sort(`${arg === 'desc' ? '-' : ''}roomsCount`),
  };
};

schema.statics.getFilters = function getFilters(query: types.ApartmentQuery): any {
  return {
    rooms: (arg: string): types.ApartmentQuery => query.where('roomsCount').equals(+arg),
    startDate: async (searchParams: types.ISearchParams): Promise<types.ApartmentQuery> => {
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
      return query.where('_id').in(filteredIDs);
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
  getSorts(query: types.ApartmentQuery): types.ApartmentQuery;
  getFilters(query: types.ApartmentQuery): types.ApartmentQuery;
  sortBy(query: types.ApartmentQuery, sort: string, value: 'asc' | 'desc'): types.ApartmentQuery;
  filterBy(query: types.ApartmentQuery, filter: string, value: number | types.ISearchParams): types.ApartmentQuery;
}
export default mongoose.model<IApartmentDocument, IApartmentModel>('Apartment', schema);
