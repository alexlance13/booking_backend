import mongoose, { DocumentQuery } from 'mongoose';
import { IApartmentDocument } from '../db/models/Apartment';
import { IUserDocument } from '../db/models/User';
import { IVoucherDocument } from '../db/models/Voucher';

export type Optional<T extends Object> = { [key in keyof T]?: T[key] };

export type ID = mongoose.Types.ObjectId;

export interface ISearchParams {
  type: string;
  priceFrom: string;
  priceTo: string;
  variant: string;
  rooms: string;
  startDate: string;
  endDate: string;
  sortByPrice: string;
  sortByRooms: string;
}

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface IBookingInput { apartment: string; buyer: string; startDate: Date; endDate: Date }

export interface IOrderInput { voucher: string; buyer: string; quantity: number }

export interface IAuthUser { token: string; user: IUserDocument }

export interface IContext { auth: string; operationName: string }

export type ApartmentQuery = DocumentQuery<IApartmentDocument[], IApartmentDocument, {}>;

export type VoucherQuery = DocumentQuery<IVoucherDocument[], IVoucherDocument, {}>;

export type EntityQuery = DocumentQuery<IVoucherDocument[] | IApartmentDocument[], IVoucherDocument | IApartmentDocument, {}>;

export interface ISorts {
  [key: string]: (arg: string) => ApartmentQuery | VoucherQuery;
}

export interface IFilters {
  [key: string]: (arg: string | ISearchParams) => Promise<ApartmentQuery> | ApartmentQuery | VoucherQuery;
}
