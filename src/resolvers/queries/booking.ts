import { models } from '../../db';

export default {
  getBookingById: async (obj, args) => await models.booking.findById(args.id),
  getAllBookings: async () => await models.booking.find(),
};
