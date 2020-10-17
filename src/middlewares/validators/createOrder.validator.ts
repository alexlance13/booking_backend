import validate from '../../helpers/validation.helper';
import { MiddlewareFn } from '../../types';
import { IOrder } from '../../db/models/Order';

const createOrderValidation: MiddlewareFn = async (root, args: {order: IOrder}, context, info, next) => {
  const rules = {
    voucher: 'required|string',
    buyer: 'required|string',
    quantity: 'required|numeric|min:1',
  };
  const { order } = args;

  validate(rules, order);

  return next();
};

export default createOrderValidation;
