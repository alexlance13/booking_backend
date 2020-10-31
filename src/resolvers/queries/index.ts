import userResolver from './user';
import voucherResolver from './voucher';
import apartmentResolver from './apartment';
import orderResolver from './order';
import bookingResolver from './Booking';

export default {
  Query: {
    ...bookingResolver,
    ...orderResolver,
    ...apartmentResolver,
    ...voucherResolver,
    ...userResolver,
  },
};
