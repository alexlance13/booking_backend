import { create, edit, remove } from '../../services/voucher.service';
import { IVoucher, IVoucherDocument } from '../../db/models/Voucher';
import { ID, Optional } from '../../types';

export default {
  createVoucher: (obj: any, args: {voucher: IVoucher}): Promise<IVoucherDocument> => create(args.voucher),
  editVoucher: (obj: any, args: {id: ID; voucher: Optional<IVoucher>}): Promise<IVoucherDocument> => edit(args.id, args.voucher),
  removeVoucher: (obj: any, args: {id: ID; voucher: IVoucher}): Promise<IVoucherDocument> => remove(args.id),
};
