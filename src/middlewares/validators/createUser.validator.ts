import validate from '../../helpers/validation.helper';
import { MiddlewareFn, Role } from '../../types';
import { IUser } from '../../db/models/User';

const createUserValidation: MiddlewareFn = async (root, args: {user: IUser}, context, info, next) => {
  const rules = {
    first_name: 'required|min:3|max:25|alpha',
    last_name: 'required|min:3|max:25|alpha',
    email: 'required|email',
    role: `required|in:${Object.keys(Role)}`,
    password: 'required|alpha_num|min:6|max:50',
  };
  const { user } = args;

  validate(rules, user);

  return next();
};

export default createUserValidation;
