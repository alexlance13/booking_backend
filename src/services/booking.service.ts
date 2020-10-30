import { ForbiddenError, UserInputError } from 'apollo-server-express';
import { models } from '../db';
import { IBooking, IBookingDocument } from '../db/models/Booking';
import { IUser } from '../db/models/user';
import { Optional } from '../types';
import isDateBetween from '../helpers/date.helper';
import { IApartmentDocument } from '../db/models/Apartment';

export const getById = (id: string): Promise<IBookingDocument> => models.booking.findById(id).exec();
export const getAll = (): Promise<IBookingDocument[]> => models.booking.find().exec();

export const edit = async (id: string, booking: Optional<IBooking>): Promise<IBookingDocument> => {
  const newBooking = await models.booking.findByIdAndUpdate(id, booking, { new: true }).exec();
  if (!newBooking) throw new UserInputError('Booking is not defined');
  console.log(`Booking ${newBooking} was successfully edited`);
  return newBooking;
};

export const create = async (
  booking: { apartment: string; startDate: Date; endDate: Date },
  user: IUser,
): Promise<IBookingDocument> => {
  const apartment = await models.apartment.findById(booking.apartment);
  if (!apartment) throw new UserInputError("Apartment you provided doesn't exist");
  const isAlreadyBooked = apartment.bookings.some(
    (apsBooking) => isDateBetween(apsBooking.startDate, apsBooking.endDate, booking.startDate)
      || isDateBetween(apsBooking.startDate, apsBooking.endDate, booking.endDate)
      || isDateBetween(booking.startDate, booking.endDate, apsBooking.startDate)
      || isDateBetween(booking.startDate, booking.endDate, apsBooking.endDate),
  );
  if (isAlreadyBooked) throw new UserInputError('This dates are already reserved');
  const newBooking = await models.booking.create({ ...booking, buyer: user._id });
  await models.apartment.findByIdAndUpdate(apartment._id, { bookings: [...apartment.bookings, newBooking._id] });
  console.log(`Booking ${newBooking} was successfully created`);
  return newBooking;
};

export const remove = async (id: string, user: IUser): Promise<IBookingDocument> => {
  const booking = await models.booking.findById(id);
  if (user._id.toString() !== (booking?.apartment as IApartmentDocument).seller._id.toString()) { throw new ForbiddenError('Forbidden'); }
  const newBooking = await models.booking.findByIdAndDelete(booking.id);
  console.log(`Booking ${newBooking} was successfully removed`);
  return newBooking;
};
