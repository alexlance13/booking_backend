import { UserInputError } from 'apollo-server-express';
import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';

const createVoucherValidation: MiddlewareFn = async (root, args, context, info, next) => {
  const rules = {
    name: 'required|alpha_num|min:3|max:25',
    description: 'required|string|min:3|max:800',
    image: 'required|url',
    price: 'required|numeric|min:1',
    roomsCount: 'required|numeric|min:1|max:20',
    seller: 'required|alpha_num',
    variant: 'required|in:RESTAURANT,CLUB,MUSEUM,CINEMA',
    quantity: 'required|numeric|min:1',
  };
  const { voucher } = args;

  const messagesObj = validate(rules, voucher);
  if (Object.keys(messagesObj).length) {
    throw new UserInputError('ValidationError:', messagesObj);
  }
  return next();
};

export default createVoucherValidation;
