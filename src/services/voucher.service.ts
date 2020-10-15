import { models } from '../db';

export const getById = id => models.voucher.create(id);
export const getAll = () => models.voucher.find();
export const create = voucher => models.voucher.create(voucher);
export const edit =  (id, voucher) => models.voucher.findByIdAndUpdate(id, voucher);
export const remove = id => models.voucher.findByIdAndRemove(id);