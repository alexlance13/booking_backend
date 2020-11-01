import { middlewareFn } from 'graphql-add-middleware';
import validate from '../../helpers/validation.helper';
import { IVoucher } from '../../db/models/Voucher';
import { Variant } from '../../types/enums';

const createVoucherValidation: middlewareFn = async (root, args: { voucher: IVoucher }, context, info, next) => {
  const rules = {
    name: 'required|string|min:3|max:50',
    description: 'required|string|min:3|max:800',
    image: 'required|url',
    price: 'required|numeric|min:1',
    variant: `required|in:${Object.keys(Variant)}`,
    quantity: 'required|numeric|min:1',
  };

  validate(rules, args.voucher);

  return next();
};

export default createVoucherValidation;
