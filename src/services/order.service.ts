import { UserInputError } from 'apollo-server-express';
import { models } from '../db';
import { IOrder, IOrderDocument } from '../db/models/Order';
import { IUser } from '../db/models/User';
import { Optional } from '../types';

export const getById = (id: string): Promise<IOrderDocument> => models.order.findById(id).exec();

export const getAll = (): Promise<IOrderDocument[]> => models.order.find().exec();

export const edit = async (id: string, order: Optional<IOrder>): Promise<IOrderDocument> => {
  const newOrder = await models.order.findByIdAndUpdate(id, order, { new: true }).exec();
  if (!newOrder) throw new UserInputError('Booking is not defined');
  console.log(`Order ${newOrder} was successfully edited`);
  return newOrder;
};

export const remove = async (id: string): Promise<IOrderDocument> => {
  const deletedOrder = await models.order.findByIdAndRemove(id).populate('buyer').populate('voucher').exec();
  if (!deletedOrder) throw new UserInputError('Order is not defined');
  console.log(`Order ${deletedOrder} was successfully removed`);
  return deletedOrder;
};

export const create = async (order: { voucher: string; buyer: string; quantity: number }, user: IUser): Promise<IOrderDocument> => {
  const voucher = await models.voucher.findById(order.voucher);
  if (!voucher) throw new UserInputError('Voucher you provided doesn\'t exist');
  if (order.quantity > voucher.quantity) throw new UserInputError('You can\'t order more vouchers than seller has');
  const newQuantity = voucher.quantity - order.quantity;
  const createdOrder = await models.order.create({ ...order, buyer: user._id });
  await models.voucher.findByIdAndUpdate(voucher._id, { quantity: newQuantity, orders: [...voucher.orders, createdOrder._id] });
  console.log(`Order ${createdOrder} was successfully created`);
  return createdOrder;
};
