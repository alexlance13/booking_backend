import { IBookingDocument } from '../../db/models/booking';
import { getAll, getById } from '../../services/booking.service';
import { ID } from '../../types';

export default {
  getBookingById: (obj: any, args: {id: ID}): Promise<IBookingDocument> => getById(args.id),
  getAllBookings: (): Promise<IBookingDocument[]> => getAll(),
};
