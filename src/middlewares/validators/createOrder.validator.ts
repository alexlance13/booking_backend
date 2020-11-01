import { middlewareFn } from 'graphql-add-middleware';
import validate from '../../helpers/validation.helper';
import { IOrder } from '../../db/models/Order';

const createOrderValidation: middlewareFn = async (root, args: { order: IOrder }, context, info, next) => {
  const rules = {
    voucher: 'required|string',
    quantity: 'required|numeric|min:1',
  };

  validate(rules, args.order);

  return next();
};

export default createOrderValidation;
