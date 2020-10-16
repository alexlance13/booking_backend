import validate from '../../helpers/validation';
import { MiddlewareFn, Variant } from '../../types';
import { IVoucher } from '../../db/models/Voucher';

const createVoucherValidation: MiddlewareFn = async (root, args: {voucher: IVoucher}, context, info, next) => {
  const rules = {
    name: 'required|string|min:3|max:25',
    description: 'required|string|min:3|max:800',
    image: 'required|url',
    price: 'required|numeric|min:1',
    roomsCount: 'required|numeric|min:1|max:20',
    seller: 'required|string',
    variant: `required|in:${Object.keys(Variant)}`,
    quantity: 'required|numeric|min:1',
  };
  const { voucher } = args;

  validate(rules, voucher);

  return next();
};

export default createVoucherValidation;
