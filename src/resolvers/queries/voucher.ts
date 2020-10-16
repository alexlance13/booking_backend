import { IVoucherDocument } from '../../db/models/voucher';
import { getAll, getById } from '../../services/voucher.service';
import { ID } from '../../types';

export default {
  getVoucherById: (obj: any, args: {id: ID}): Promise<IVoucherDocument> => getById(args.id),
  getAllVouchers: (): Promise<IVoucherDocument[]> => getAll(),
};
