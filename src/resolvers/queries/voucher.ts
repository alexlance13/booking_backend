import { models } from '../../db';

export default {
  getVoucherById: async (obj, args) => await models.voucher.findById(args.id),
  getAllVouchers: async () => await models.voucher.find(),
};
