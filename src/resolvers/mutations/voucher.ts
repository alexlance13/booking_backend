import { create, edit, remove } from '../../services/voucher.service';
import { IVoucher, IVoucherDocument } from '../../db/models/Voucher';
import { Optional } from '../../types';
import { IUser } from '../../db/models/user';

export default {
  createVoucher: (obj: any, args: {voucher: IVoucher}): Promise<IVoucherDocument> => create(args.voucher),
  editVoucher: (obj: any, args: {id: string; voucher: Optional<IVoucher>}, context: {user: IUser}): Promise<IVoucherDocument> => edit(args.id, args.voucher, context.user),
  removeVoucher: (obj: any, args: {id: string; voucher: IVoucher}, context: {user: IUser}): Promise<IVoucherDocument> => remove(args.id, context.user),
};
