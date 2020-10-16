import { create, edit, remove } from '../../services/booking.service';
import { IBooking, IBookingDocument } from '../../db/models/Booking';
import { ID, Optional } from '../../types';

export default {
  createBooking: (obj: any, args: {booking: IBooking}): Promise<IBookingDocument> => create(args.booking),
  editBooking: (obj: any, args: {id: ID; booking: Optional<IBooking>}): Promise<IBookingDocument> => edit(args.id, args.booking),
  removeBooking: (obj: any, args: {id: ID; booking: IBooking}): Promise<IBookingDocument> => remove(args.id),
};
