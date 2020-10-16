import mongoose from 'mongoose';

export type MiddlewareFn = (root, args, context, info, next) => Promise<any>;
export enum Variant { 'RESTAURANT', 'CLUB', 'MUSEUM', 'CINEMA' }
export enum Role { 'BUYER', 'SELLER' }
export type Optional<T extends Object> = { [key in keyof T]?: T[key] };
export type ID = mongoose.Types.ObjectId;
