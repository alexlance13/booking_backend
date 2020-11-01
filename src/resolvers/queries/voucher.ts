import { IVoucherDocument } from '../../db/models/Voucher';
import { getAll, getById } from '../../services/voucher.service';
import { ISearchParams, VoucherQuery } from '../../types';

export default {
  getVoucherById: (source, args: { id: string }): Promise<IVoucherDocument> => getById(args.id),
  getAllVouchers: (source, args: { searchParams: ISearchParams }): Promise<VoucherQuery> => getAll(args),
};
