import { models } from '../db';
import { IBooking, IBookingDocument } from '../db/models/Booking';
import { IUser } from '../db/models/user';
import { Optional } from '../types';
import isDateBetween from '../helpers/date.helper';

export const getById = (id: string): Promise<IBookingDocument> => models.booking.findById(id).exec();
export const getAll = (): Promise<IBookingDocument[]> => models.booking.find().exec();

export const edit = async (id: string, booking: Optional<IBooking>): Promise<IBookingDocument> => {
  try {
    await models.booking.findById(id);
  } catch (e) {
    throw new Error('Booking is not defined');
  }
  return models.booking.findByIdAndUpdate(id, booking, { new: true }).exec();
};

export const create = async (booking: {apartment: string; buyer: string; dateStart: Date; dateEnd: Date}, user: IUser): Promise<IBookingDocument> => {
  if (user._id.toString() !== booking?.buyer) throw new Error('Forbidden');
  const apartment = await models.apartment.findById(booking.apartment);
  if (!apartment) throw new Error('Apartment you provided doesn\'t exist');
  const isAlreadyBooked = apartment.bookings.some((apsBooking) => isDateBetween(apsBooking.dateStart, apsBooking.dateEnd, booking.dateStart)
  || isDateBetween(apsBooking.dateStart, apsBooking.dateEnd, booking.dateEnd)
  || isDateBetween(booking.dateStart, booking.dateEnd, apsBooking.dateStart)
  || isDateBetween(booking.dateStart, booking.dateEnd, apsBooking.dateEnd));
  if (isAlreadyBooked) throw new Error('This dates are already reserved');
  const newBooking = await models.booking.create(booking);
  await models.apartment.findByIdAndUpdate(apartment._id, { bookings: [...apartment.bookings, newBooking._id] });
  return newBooking;
};

export const remove = async (id: string, user: IUser): Promise<IBookingDocument> => {
  const booking = await models.booking.findById(id);
  if (user._id.toString() !== booking?.apartment.seller._id.toString()) throw new Error('Forbidden');
  return models.booking.findByIdAndDelete(booking.id);
};
