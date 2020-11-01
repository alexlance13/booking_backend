import { create, edit, remove } from '../../services/voucher.service';
import { IVoucher, IVoucherDocument } from '../../db/models/Voucher';
import { Optional } from '../../types';
import { IUser } from '../../db/models/User';

export default {
  createVoucher: (source, args: { voucher: IVoucher }, context: { user: IUser}): Promise<IVoucherDocument> => create(args.voucher, context.user),
  editVoucher: (source, args: { id: string; voucher: Optional<IVoucher> }, context: { user: IUser }): Promise<IVoucherDocument> => edit(args.id, args.voucher, context.user),
  removeVoucher: (source, args: { id: string; voucher: IVoucher }, context: { user: IUser }): Promise<IVoucherDocument> => remove(args.id, context.user),
};
