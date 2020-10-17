import { IVoucherDocument } from '../../db/models/voucher';
import { getAll, getById } from '../../services/voucher.service';

export default {
  getVoucherById: (obj: any, args: {id: string}): Promise<IVoucherDocument> => getById(args.id),
  getAllVouchers: (): Promise<IVoucherDocument[]> => getAll(),
};
