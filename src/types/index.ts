import mongoose from 'mongoose';

export type MiddlewareFn = (root, args, context, info, next) => Promise<any>;
export enum Variant { 'RESTAURANT', 'CLUB', 'MUSEUM', 'CINEMA' }
export enum Role { 'BUYER', 'SELLER', 'ADMIN' }
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
  availableDates: string;
  sortByRooms: string;
}
export enum SortType { 'asc', 'desc'}
