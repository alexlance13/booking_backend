import { getAll, getById } from '../../services/booking.service';

export default {
  getBookingById: (obj, args) => getById(args.id),
  getAllBookings: () => getAll(),
};
