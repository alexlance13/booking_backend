import { models } from '../db';
import { IOrder, IOrderDocument } from '../db/models/Order';
import { IUser } from '../db/models/user';
import { Optional } from '../types';

export const getById = (id: string): Promise<IOrderDocument> => models.order.findById(id).exec();
export const getAll = (): Promise<IOrderDocument[]> => models.order.find().exec();

export const edit = async (id: string, order: Optional<IOrder>): Promise<IOrderDocument> => {
  try {
    await models.order.findById(id);
  } catch (e) {
    throw new Error('Order is not defined');
  }
  return models.order.findByIdAndUpdate(id, order, { new: true }).exec();
};

export const remove = async (id: string): Promise<IOrderDocument> => {
  try {
    await models.order.findById(id);
  } catch (e) {
    throw new Error('Order is not defined');
  }
  return models.order.findByIdAndRemove(id).populate('buyer').populate('voucher').exec();
};

export const create = async (order: {voucher: string; buyer: string; quantity: number}, user: IUser): Promise<IOrderDocument> => {
  if (user._id.toString() !== order?.buyer) throw new Error('Forbidden');
  const voucher = await models.voucher.findById(order.voucher);
  if (!voucher) throw new Error('Voucher you provided doesn\'t exist');
  if (order.quantity > voucher.quantity) throw new Error('You can\'t order more vouchers than seller has');
  const newQuantity = voucher.quantity - order.quantity;
  await models.voucher.findByIdAndUpdate(voucher._id, { quantity: newQuantity });
  return models.order.create(order);
};
