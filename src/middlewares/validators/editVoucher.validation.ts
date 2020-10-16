import { UserInputError } from 'apollo-server-express';
import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';

const createVoucherValidation: MiddlewareFn = (root, args, context, info, next) => {
  const rules = {
    name: 'required_without:description,image,price,seller,variant,quantity|alpha_num|min:3|max:25',
    description: 'required_without:name,image,price,seller,variant,quantity|string|min:3|max:800',
    image: 'required_without:name,description,price,seller,variant,quantity|url',
    price: 'required_without:name,description,image,seller,variant,quantity|numeric|min:1',
    seller: 'required_without:name,description,image,price,variant,quantity|alpha_num',
    variant: 'required_without:name,description,image,price,seller,quantity|in:RESTAURANT,CLUB,MUSEUM,CINEMA',
    quantity: 'required_without:name,description,image,price,seller,variant|numeric|min:1',
  };
  const { voucher } = args;

  const messagesObj = validate(rules, voucher);
  if (Object.keys(messagesObj).length) {
    throw new UserInputError('ValidationError:', messagesObj);
  }
  return next();
};

export default createVoucherValidation;
