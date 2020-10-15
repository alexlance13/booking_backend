import { create } from '../../services/booking.service';

export default {
  createBooking: (obj, args) => create(args.booking),
};
