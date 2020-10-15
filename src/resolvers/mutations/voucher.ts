import { create, edit, remove } from '../../services/voucher.service';

export default {
  createVoucher: (obj, args) => create(args.voucher),
  editVoucher: (obj, args) => edit(args.id, args.voucher),
  removeVoucher: (obj, args) => remove(args.id),
};
