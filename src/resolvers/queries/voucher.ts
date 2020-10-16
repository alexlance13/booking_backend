import { getAll, getById } from '../../services/voucher.service';

export default {
  getVoucherById: (obj, args) => getById(args.id),
  getAllVouchers: () => getAll(),
};
