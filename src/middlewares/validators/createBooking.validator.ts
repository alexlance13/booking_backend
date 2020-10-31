import validate from '../../helpers/validation.helper';
import { MiddlewareFn } from '../../types';
import { IBooking } from '../../db/models/Booking';

const createBookingValidation: MiddlewareFn = (root, args: { booking: IBooking }, context, info, next) => {
  const rules = {
    apartment: 'required|string',
    startDate: 'required|myDateFormat|notPast|date',
    endDate: `required|myDateFormat|lessThenMonth:${args.booking.startDate}|after_or_equal:startDate`,
  };

  validate(rules, args.booking);

  return next();
};

export default createBookingValidation;
