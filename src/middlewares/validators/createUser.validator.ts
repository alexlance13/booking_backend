import { middlewareFn } from 'graphql-add-middleware';
import validate from '../../helpers/validation.helper';
import { IUser } from '../../db/models/User';
import { Role } from '../../types/enums';

const createUserValidation: middlewareFn = async (root, args: { user: IUser }, context, info, next) => {
  const rules = {
    first_name: 'required|min:3|max:50|userName',
    last_name: 'required|min:3|max:50|userName',
    email: 'required|email|min:7|max:50',
    role: `required|in:${Object.keys(Role)}`,
    password: 'required|alpha_num|min:6|max:50',
  };

  validate(rules, args.user);

  return next();
};

export default createUserValidation;
