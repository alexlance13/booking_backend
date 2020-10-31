import { IBookingDocument } from '../../db/models/Booking';
import { getAll, getById } from '../../services/booking.service';

export default {
  getBookingById: (obj: any, args: {id: string}): Promise<IBookingDocument> => getById(args.id),
  getAllBookings: (): Promise<IBookingDocument[]> => getAll(),
};
