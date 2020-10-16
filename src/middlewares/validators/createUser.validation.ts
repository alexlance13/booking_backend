import { UserInputError } from 'apollo-server-express';
import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';

const createUserValidation: MiddlewareFn = async (root, args, context, info, next) => {
  const rules = {
    first_name: 'required|min:3|max:25|alpha',
    last_name: 'required|min:3|max:25|alpha',
    email: 'required|email',
    role: 'required|in:BUYER,SELLER',
  };
  const { user } = args;
  const messagesObj = validate(rules, user);
  if (Object.keys(messagesObj).length) {
    throw new UserInputError('Validation Error:', messagesObj);
  }
  return next();
};

export default createUserValidation;
