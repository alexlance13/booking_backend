import { create, edit, remove } from '../../services/booking.service';
import { IBooking, IBookingDocument } from '../../db/models/Booking';
import { Optional, IBookingInput } from '../../types';
import { IUser } from '../../db/models/user';

export default {
  createBooking: (obj: any, args: { booking: IBookingInput }, context: { user: IUser }): Promise<IBookingDocument> => create(args.booking, context.user),
  editBooking: (obj: any, args: { id: string; booking: Optional<IBooking> }): Promise<IBookingDocument> => edit(args.id, args.booking),
  removeBooking: (obj: any, args: { id: string }, context: { user: IUser }): Promise<IBookingDocument> => remove(args.id, context.user),
};
