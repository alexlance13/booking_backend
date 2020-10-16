import { UserInputError } from 'apollo-server-express';
import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';

const createBookingValidation: MiddlewareFn = (root, args, context, info, next) => {
  const rules = {
    apartment: 'required|alpha_num',
    buyer: 'required|alpha_num',
    quantity: 'required|numeric|min:1',
    dateStart: 'required|date',
    dateEnd: 'required|after_or_equal:dateStart',
  };
  const { booking } = args;

  const messagesObj = validate(rules, booking);
  if (Object.keys(messagesObj).length) {
    throw new UserInputError('Validation Error:', messagesObj);
  }
  return next();
};

export default createBookingValidation;
