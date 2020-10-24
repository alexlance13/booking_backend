import mongoose from 'mongoose';
import validate from '../../helpers/validation.helper';
import { MiddlewareFn, Optional, Role } from '../../types';
import { IUser } from '../../db/models/User';

const editUserValidation: MiddlewareFn = (root, args: {user: Optional<IUser>; id: string}, context, info, next) => {
  const rules = {
    _id: 'required|alpha_num',
    first_name: 'min:3|max:50|userName',
    last_name: 'min:3|max:50|userName',
    email: 'email|min:7|max:50',
    role: `in:${Object.keys(Role)}`,
    password: 'alpha_num|min:6|max:50',
  };
  const { user, id } = args;
  user._id = mongoose.Types.ObjectId(id);

  validate(rules, user);

  return next();
};

export default editUserValidation;
