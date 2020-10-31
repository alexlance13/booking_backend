import mongoose from 'mongoose';
import validate from '../../helpers/validation.helper';
import { MiddlewareFn, Optional } from '../../types';
import { IOrder } from '../../db/models/Order';

const editOrderValidation: MiddlewareFn = (root, args: { order: Optional<IOrder>; id: string }, context, info, next) => {
  const rules = {
    _id: 'required|alpha_num',
    voucher: 'string',
    quantity: 'numeric|min:1',
  };
  const { order, id } = args;
  order._id = mongoose.Types.ObjectId(id);

  validate(rules, order);

  return next();
};

export default editOrderValidation;
