import { models } from '../../db';

export default {
  createBooking: async (obj, args) => {
    const res = await models.booking.create(args.booking);
    console.log(res);
    return res;
  },
};
