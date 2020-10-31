import { UserInputError } from 'apollo-server-express';
import { models } from '../db';
import { IUser } from '../db/models/User';
import { IVoucher, IVoucherDocument } from '../db/models/Voucher';
import { ISearchParams, Optional, VoucherQuery } from '../types';

export const getById = (id: string): Promise<IVoucherDocument> => models.voucher.findById(id).exec();

export const getAll = async (args: {searchParams: ISearchParams}): Promise<VoucherQuery> => {
  const query = models.voucher.find();
  const promises = Object.entries(args.searchParams).map(([key, value]): VoucherQuery => {
    models.voucher.sortBy(query, key, value);
    return models.voucher.filterBy(query, key, value);
  });
  await Promise.all(promises);
  return query.exec();
};

export const create = async (voucher: IVoucher, user: IUser): Promise<IVoucherDocument> => {
  const newVoucher = await models.voucher.create({ ...voucher, seller: user._id });
  console.log(`Voucher ${newVoucher} was successfully created`);
  return newVoucher;
};

export const edit = async (id: string, voucher: Optional<IVoucher>, user: IUser): Promise<IVoucherDocument> => {
  if (!(await models.voucher.findOne({ _id: id, seller: user._id }))) throw new UserInputError('Voucher is not defined');
  const editedVoucher = await models.voucher.findByIdAndUpdate(id, voucher, { new: true }).exec();
  console.log(`Voucher ${editedVoucher} was successfully edited`, user);
  return editedVoucher;
};

export const remove = async (id: string, user: IUser): Promise<IVoucherDocument> => {
  if (!(await models.voucher.findOne({ _id: id, seller: user._id }))) throw new UserInputError('Voucher is not defined');
  const removedVoucher = await models.voucher
    .findByIdAndRemove(id)
    .populate('seller')
    .exec();
  console.log(`Voucher ${removedVoucher} was successfully removed`);
  return removedVoucher;
};
