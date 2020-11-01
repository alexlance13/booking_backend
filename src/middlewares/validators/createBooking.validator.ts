import { middlewareFn } from 'graphql-add-middleware';
import validate from '../../helpers/validation.helper';
import { IBooking } from '../../db/models/Booking';

const createBookingValidation: middlewareFn = (root, args: { booking: IBooking }, context, info, next) => {
  const rules = {
    apartment: 'required|string',
    startDate: 'required|myDateFormat|notPast|date',
    endDate: `required|myDateFormat|lessThenMonth:${args.booking.startDate}|after_or_equal:startDate`,
  };

  validate(rules, args.booking);

  return next();
};

export default createBookingValidation;
