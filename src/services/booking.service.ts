import { models } from '../db';

export const create = (booking) => models.booking.create(booking);
export const getById = (id) => models.booking.create(id);
export const getAll = () => models.booking.find();
