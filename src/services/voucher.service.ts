import { models } from '../db';
import { IUser } from '../db/models/user';
import { IVoucher, IVoucherDocument } from '../db/models/Voucher';
import { Optional } from '../types';

export const getById = (id: string): Promise<IVoucherDocument> => models.voucher.findById(id).exec();
export const getAll = (): Promise<IVoucherDocument[]> => models.voucher.find().exec();
export const create = (voucher: IVoucher, user: IUser): Promise<IVoucherDocument> => {
  if (voucher.seller !== user._id) throw new Error('Forbidden');
  return models.voucher.create(voucher);
};

export const edit = async (id: string, voucher: Optional<IVoucher>, user: IUser): Promise<IVoucherDocument> => {
  const vouch = await models.voucher.findById(id);
  if (!vouch) throw new Error('Voucher is not defined');
  if (vouch.seller._id !== user._id) throw new Error('Forbidden');
  return models.voucher.findByIdAndUpdate(id, voucher, { new: true }).exec();
};

export const remove = async (id: string, user: IUser): Promise<IVoucherDocument> => {
  const vouch = await models.voucher.findById(id);
  if (!vouch) throw new Error('Voucher is not defined');
  if (vouch.seller._id !== user._id) throw new Error('Forbidden');
  return models.voucher.findByIdAndRemove(id).populate('seller').exec();
};
