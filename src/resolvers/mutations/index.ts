import userResolver from './user';
import apartmentResolver from './apartment';
import voucherResolver from './voucher';
import bookingResolver from './Booking';
import orderResolver from './order';

export default {
  Mutation: {
    ...orderResolver,
    ...bookingResolver,
    ...voucherResolver,
    ...apartmentResolver,
    ...userResolver,
  },
};
