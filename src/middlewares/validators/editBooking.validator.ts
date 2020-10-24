import mongoose from 'mongoose';
import validate from '../../helpers/validation.helper';
import { MiddlewareFn, Optional } from '../../types';
import { IBooking } from '../../db/models/Booking';

const editBookingValidation: MiddlewareFn = (root, args: { booking: Optional<IBooking>; id: string }, context, info, next) => {
  const rules = {
    _id: 'required|alpha_num',
    apartment: 'string',
    startDate: 'date',
    endDate: 'after_or_equal:startDate',
  };
  const { booking, id } = args;
  booking._id = mongoose.Types.ObjectId(id);

  validate(rules, booking);

  return next();
};

export default editBookingValidation;
