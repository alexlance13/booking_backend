import { UserInputError } from 'apollo-server-express';
import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';

const editApartmentValidation: MiddlewareFn = (root, args, context, info, next) => {
  const rules = {
    name: 'required_without:description,image,price,roomsCount,seller|alpha_num|min:3|max:25',
    description: 'required_without:name,image,price,roomsCount,seller|string|min:3|max:800',
    image: 'required_without:name,description,price,roomsCount,seller|url',
    price: 'required_without:name,description,image,roomsCount,seller|numeric|min:1',
    roomsCount: 'required_without:name,description,image,price,seller|numeric|min:1|max:20',
    seller: 'required_without:name,description,image,price,roomsCount|alpha_num',
  };
  const { apartment } = args;

  const messagesObj = validate(rules, apartment);
  if (Object.keys(messagesObj).length) {
    throw new UserInputError('Validation Error:', messagesObj);
  }
  return next();
};

export default editApartmentValidation;
