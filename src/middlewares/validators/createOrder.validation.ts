import { UserInputError } from 'apollo-server-express';
import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';

const createOrderValidation: MiddlewareFn = async (root, args, context, info, next) => {
  const rules = {
    voucher: 'required|alpha_num',
    buyer: 'required|alpha_num',
    quantity: 'required|numeric|min:1',
  };
  const { order } = args;

  const messagesObj = validate(rules, order);
  if (Object.keys(messagesObj).length) {
    throw new UserInputError('Validation Error:', messagesObj);
  }
  return next();
};

export default createOrderValidation;
