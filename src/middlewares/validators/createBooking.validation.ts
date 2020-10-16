import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';
import { IBooking } from '../../db/models/Booking';

const createBookingValidation: MiddlewareFn = (root, args: {booking: IBooking}, context, info, next) => {
  const rules = {
    apartment: 'required|string',
    buyer: 'required|string',
    dateStart: 'required|date',
    dateEnd: 'required|after_or_equal:dateStart',
  };
  const { booking } = args;

  validate(rules, booking);

  return next();
};

export default createBookingValidation;
