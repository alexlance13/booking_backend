import { models } from '../db';
import { IBooking, IBookingDocument } from '../db/models/Booking';
import { Optional, ID } from '../types';

export const getById = (id: ID): Promise<IBookingDocument> => models.booking.findById(id).exec();
export const getAll = (): Promise<IBookingDocument[]> => models.booking.find().exec();
export const create = (booking: IBooking): Promise<IBookingDocument> => models.booking.create(booking);
export const edit = (id: ID, booking: Optional<IBooking>): Promise<IBookingDocument> => models.booking.findByIdAndUpdate(id, booking, { new: true }).exec();
export const remove = (id: ID): Promise<IBookingDocument> => models.booking.findByIdAndRemove(id).populate('buyer').populate('apartment').exec();
