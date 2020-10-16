import { models } from '../db';

export const create = (order) => models.order.create(order);
export const getById = (id) => models.order.create(id);
export const getAll = () => models.order.find();
