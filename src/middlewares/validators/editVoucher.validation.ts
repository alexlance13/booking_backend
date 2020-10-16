import { IVoucher } from '../../db/models/voucher';
import validate from '../../helpers/validation';
import { MiddlewareFn, Optional, Variant } from '../../types';

const createVoucherValidation: MiddlewareFn = (root, args: {voucher: Optional<IVoucher>}, context, info, next) => {
  const rules = {
    _id: 'required|alpha_num',
    name: 'string|min:3|max:25',
    description: 'string|min:3|max:800',
    image: 'url',
    price: 'numeric|min:1',
    seller: 'string',
    variant: `in:${Object.keys(Variant)}`,
    quantity: 'numeric|min:1',
  };
  const { voucher } = args;

  validate(rules, voucher);

  return next();
};

export default createVoucherValidation;
