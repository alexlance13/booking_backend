import { models } from '../db';
import { IOrder, IOrderDocument } from '../db/models/Order';
import { Optional, ID } from '../types';

export const getById = (id: ID): Promise<IOrderDocument> => models.order.findById(id).exec();
export const getAll = (): Promise<IOrderDocument[]> => models.order.find().exec();
export const create = (order: IOrder): Promise<IOrderDocument> => models.order.create(order);
export const edit = (id: ID, order: Optional<IOrder>): Promise<IOrderDocument> => models.order.findByIdAndUpdate(id, order, { new: true }).exec();
export const remove = (id: ID): Promise<IOrderDocument> => models.order.findByIdAndRemove(id).populate('buyer').populate('voucher').exec();
