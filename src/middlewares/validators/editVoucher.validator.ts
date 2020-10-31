import mongoose from 'mongoose';
import { IVoucher } from '../../db/models/Voucher';
import validate from '../../helpers/validation.helper';
import { MiddlewareFn, Optional, Variant } from '../../types';

const editVoucherValidation: MiddlewareFn = (root, args: {voucher: Optional<IVoucher>; id: string}, context, info, next) => {
  const rules = {
    _id: 'required|alpha_num',
    name: 'string|min:3|max:50',
    description: 'string|min:3|max:800',
    image: 'url',
    price: 'numeric|min:1',
    variant: `in:${Object.keys(Variant)}`,
    quantity: 'numeric|min:1',
  };
  const { voucher, id } = args;
  voucher._id = mongoose.Types.ObjectId(id);

  validate(rules, voucher);

  return next();
};

export default editVoucherValidation;
