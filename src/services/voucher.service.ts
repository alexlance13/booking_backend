import { models } from '../db';
import { IVoucher, IVoucherDocument } from '../db/models/Voucher';
import { Optional, ID } from '../types';

export const getById = (id: ID): Promise<IVoucherDocument> => models.voucher.findById(id).exec();
export const getAll = (): Promise<IVoucherDocument[]> => models.voucher.find().exec();
export const create = (voucher: IVoucher): Promise<IVoucherDocument> => models.voucher.create(voucher);
export const edit = (id: ID, voucher: Optional<IVoucher>): Promise<IVoucherDocument> => models.voucher.findByIdAndUpdate(id, voucher, { new: true }).exec();
export const remove = (id: ID): Promise<IVoucherDocument> => models.voucher.findByIdAndRemove(id).populate('seller').exec();
