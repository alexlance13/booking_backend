import validate from '../../helpers/validation.helper';
import { MiddlewareFn } from '../../types';
import { IBooking } from '../../db/models/Booking';

const createBookingValidation: MiddlewareFn = (root, args: {booking: IBooking}, context, info, next) => {
  const { booking } = args;
  const rules = {
    apartment: 'required|string',
    buyer: 'required|string',
    dateStart: 'required|myDateFormat|notPast|date',
    dateEnd: `required|myDateFormat|lessThenYear:${booking.dateStart}|after_or_equal:dateStart`,
  };

  validate(rules, booking);

  return next();
};

export default createBookingValidation;
