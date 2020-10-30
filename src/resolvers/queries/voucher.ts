import { IVoucherDocument } from '../../db/models/voucher';
import { getAll, getById } from '../../services/voucher.service';
import { VoucherQuery } from '../../types';

export default {
  getVoucherById: (obj: any, args: {id: string}): Promise<IVoucherDocument> => getById(args.id),
  getAllVouchers: (obj: any, args: any): Promise<VoucherQuery> => getAll(args),
};
