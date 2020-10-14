import { models } from '../../db';

export default {
  createVoucher: async (obj, args) => await models.voucher.create(args.voucher),
  editVoucher: async (obj, args) =>
    await models.voucher.findByIdAndUpdate(args.id, args.voucher),
  deleteVoucher: async (obj, args) =>
    await models.voucher.findByIdAndDelete(args.id),
};
