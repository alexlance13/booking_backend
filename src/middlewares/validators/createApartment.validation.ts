import { UserInputError } from 'apollo-server-express';
import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';

const createApartmentValidation: MiddlewareFn = async (root, args, context, info, next) => {
  const rules = {
    name: 'required|alpha_num|min:3|max:25',
    description: 'required|string|min:3|max:800',
    image: 'required|url',
    price: 'required|numeric|min:1',
    roomsCount: 'required|numeric|min:1|max:20',
    seller: 'required|alpha_num',
  };
  const { apartment } = args;

  const messagesObj = validate(rules, apartment);
  if (Object.keys(messagesObj).length) {
    throw new UserInputError('Validation Error:', messagesObj);
  }
  return next();
};

export default createApartmentValidation;
